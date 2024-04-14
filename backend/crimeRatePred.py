import streamlit as st
import pandas as pd
from prophet import Prophet
import matplotlib.pyplot as plt
import folium
import os
from dotenv import load_dotenv
from folium.plugins import HeatMap
from datetime import datetime
import regex as re
from streamlit_folium import folium_static
from pandasai import SmartDatalake

load_dotenv()

df0 = pd.read_csv("AccusedData.csv")
df1 = pd.read_csv("ComplainantDetailsData.csv")
df2 = pd.read_csv("FIR_Details_Data (1).csv")
df3 = pd.read_csv("VictimInfoDetails.csv")

st.set_page_config(page_title="Data Chat Bot",)
st.set_option('deprecation.showPyplotGlobalUse', False)
st.title('District-Wise Crime Rate Prediction using Facebook Prophet')
data = pd.read_csv("FIR_Details_Data (1).csv")
data['Offence_From_Date'] = pd.to_datetime(data['Offence_From_Date'])

if 'District_Name' not in data.columns:
    st.error("The dataset does not contain 'District_Name'. Please upload a dataset with location data.")
    st.stop()

data = data[data['Offence_From_Date'] >= '2019-01-01']
data.dropna(subset=['Offence_From_Date', 'District_Name'], inplace=True)

if data.empty:
    st.error("No data available from 2019 onwards. Please check your dataset.")
    st.stop()


district_list = data['District_Name'].unique()
selected_district = st.selectbox('Select a District for Analysis', district_list)
district_data = data[data['District_Name'] == selected_district]
district_data.set_index('Offence_From_Date', inplace=True)
district_resampled = district_data.resample('M').size()

if district_resampled.empty:
    st.error(f"No data available for {selected_district} from 2019 onwards. Please select another district.")
    st.stop()


df_prophet = pd.DataFrame(district_resampled.reset_index())
df_prophet.columns = ['ds', 'y']
m = Prophet()
m.fit(df_prophet)
forecast_periods = st.slider('Select number of months to forecast', min_value=1, max_value=48, value=12)
future = m.make_future_dataframe(periods=forecast_periods, freq='M')
forecast = m.predict(future)


fig, ax = plt.subplots(figsize=(14, 7))
ax.plot(forecast['ds'], forecast['yhat'], label='Forecast (yhat)', color='red', marker='o')
ax.fill_between(forecast['ds'], forecast['yhat_lower'], forecast['yhat_upper'], color='gray', alpha=0.2, label='Forecast Confidence Interval')
ax.plot(forecast['ds'], forecast['trend'], label='Trend', color='blue', linestyle='--')
ax.set_title(f'Forecast Visualization for {selected_district}')
ax.set_xlabel('Date')
ax.set_ylabel('Number of Crimes')
ax.legend()
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
st.pyplot(fig)

st.write("Forecast Data:")
def load_data():
    # Load data, assuming CSV format
    data = pd.read_csv("FIR_Details_Data (1).csv")
    data['Offence_From_Date'] = pd.to_datetime(data['Offence_From_Date'])
    return data


def extract_distance_from_text(text):
    text = str(text)
    # Search for numbers followed by KM, MTRS, or MM (account for spaces and case-insensitivity)
    match = re.search(r'(\d+(\.\d+)?)(?=\s?(KM|MTRS|MM|K M|M))', text, re.IGNORECASE)
    
    if match:
        # Extract the distance and convert to float
        distance = float(match.group(1))
        unit = match.group(3).upper().replace(" ", "")  # Normalize the unit
        
        # Convert to kilometers if necessary
        if unit in ["MTRS", "M","MITERS",'MITER','meters','METER','feet']:
            return distance / 1000.0  # Convert meters to kilometers
        elif unit == "MM":
            return distance / 1000000.0  # Convert millimeters to kilometers
        else:
            return distance  # Assume the distance is already in kilometers
    else:
        return None  # In case no distance is found

def main():
    st.title('Crime Analysis for Patrol Planning')

    df = load_data()
    df['Distance'] = df['Distance from PS'].apply(extract_distance_from_text)
    

    # Sidebar for user inputs
    st.sidebar.header('Filters')
    year_to_filter = st.sidebar.number_input('Year', min_value=int(2015), max_value=int(2025), value=int(2015))

    filtered_data = df[df['Offence_From_Date'].dt.year == year_to_filter]

    # Display mean distance from the police station
    mean_distance = filtered_data['Distance'].mean()
    st.write(f"Average distance of crimes from the police station in {year_to_filter}: {mean_distance:.2f} km")
 
    filtered_data = df[df['Offence_From_Date'].dt.year == year_to_filter]
 
     # Calculate average distance by region
    average_distance_by_region = filtered_data.groupby('UnitName')['Distance'].mean().dropna()
    top_regions = average_distance_by_region.nlargest(10)
    bottom_regions = average_distance_by_region.nsmallest(10)

 
    st.subheader('Top 10 Regions with the Highest Average Distance from Police Station')
    st.bar_chart(top_regions)

    st.subheader('Top 10 Regions with the Lowest Average Distance from Police Station')
    st.bar_chart(bottom_regions)


    st.subheader('Map of Crime Locations in Karnataka')

    # Define the center of Karnataka approximately
    karnataka_center = [15.3173, 75.7139]  # Approximate latitude and longitude of Karnataka center
    
    # Create a map centered on Karnataka
    m = folium.Map(location=karnataka_center, zoom_start=6, min_zoom=6, max_zoom=18)  # Adjust zoom level as needed for better focus
    
    # Add a heatmap to the map
    if not filtered_data[['Latitude', 'Longitude']].dropna().empty:
        HeatMap(data=filtered_data[['Latitude', 'Longitude']].dropna(), radius=15).add_to(m)
    else:
        st.write("No location data available to display on the map for the selected year.")

    # Display the map
    folium_static(m)
 
if __name__ == "__main__":
     main()




os.environ['PANDASAI_API_KEY'] = '$2a$10$4QQRPAqIaBaY3GPe9YaumOqJClbhfxtzoLzQPMr8dgEWSLOFNqEma'
lake = SmartDatalake([df0, df1, df2, df3])
st.title("Data Chat Bot Interface")
st.header("Chat with Data")
user_input = st.text_input("Ask a question about the data:")

# Display user question and bot response
if user_input:
    # Send the question to pandasai and get the response
    response = lake.chat(user_input)
    st.text_area("Bot Response:", value=response, height=300)
else:
    st.write("Please enter a question to start chatting.")

