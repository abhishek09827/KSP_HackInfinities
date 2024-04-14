from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Define the endpoints for the Victim Analysis and Crime Rate Prediction APIs
victim_analysis_api_endpoint = "victim_analysis"
crime_rate_prediction_api_endpoint = "crime_rate_prediction"

@app.route('/victim_analysis', methods=['POST'])
def victim_analysis():
    # Extract data from the request
    data = request.json

    # Forward the data to the Victim Analysis API
    response = requests.post(victim_analysis_api_endpoint, json=data)
    
    # Return the response from the Victim Analysis API
    return jsonify(response.json()), response.status_code

@app.route('/crime_rate_prediction', methods=['POST'])
def crime_rate_prediction():
    # Extract data from the request
    data = request.json

    # Forward the data to the Crime Rate Prediction API
    response = requests.post(crime_rate_prediction_api_endpoint, json=data)
    
    # Return the response from the Crime Rate Prediction API
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
