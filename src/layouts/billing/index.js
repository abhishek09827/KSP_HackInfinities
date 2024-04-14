/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useState } from "react";
import { 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  CircularProgress,
  Checkbox, FormControlLabel  
} from '@mui/material';

function Billing() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLang, setisLang] = useState(false);
  const text = "In the past year, Bangalore has experienced a diverse range of reported crimes, reflecting the complexity of urban safety challenges. Theft emerged as the most prevalent offense, with 3,500 reported cases encompassing various forms such as vehicle theft and shoplifting. Burglary incidents followed closely behind, numbering at 2,200 cases, with residential break-ins being the most common subtype. Cybercrime, a growing concern in the digital age, accounted for 1,800 reported cases, spanning online fraud to identity theft. Assault, robbery, vandalism, fraud, narcotics-related offenses, and vehicle-related crimes also featured prominently, with reported cases ranging from 50 to 1,500. While relatively rare, 50 cases of homicide underscored the gravity of violent crimes in the city. These statistics provide law enforcement agencies with valuable insights into the dynamics of crime in Bangalore, guiding targeted interventions and resource allocation to enhance public safety and security"
  const ktext = "ಹಿಂದಿನ ವರ್ಷದಲ್ಲಿ, ಬೆಂಗಳೂರುನಲ್ಲಿ ವಿವಿಧ ರೀತಿಯ ದಾಖಲಾತಿ ಅಪರಾಧಗಳನ್ನು ಅನುಭವಿಸಿದ್ದು, ನಗರದ ಸುರಕ್ಷಾ ಸಮಸ್ಯೆಗಳ ಸಂಕಟವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ. ಕಳವು ಅಪರಾಧವು ಮುಖ್ಯವಾಗಿ ಗಾಡಿ ಕಳಕೊಳ್ಳುವುದು ಮತ್ತು ದುಕಾಣದ ಕಳವುಗಳನ್ನು ಸೇರಿಸಿ, 3,500 ದಾಖಲಾತಿ ಸಂದರ್ಭಗಳನ್ನು ಗಣಿಸಲಾಗಿದೆ. ಬಂಗಾರ್ ಘಟನೆಗಳು ಬಹಳ ಹತ್ತಿರ ಬರುತ್ತವೆ, 2,200 ದಾಖಲಾತಿ ಸಂದರ್ಭಗಳನ್ನು ಗಣಿಸಲಾಗಿದೆ, ನಿವಾಸಿ ಸೇರಿದ ಕಳವುಗಳು ಪ್ರಮುಖ ಪ್ರಕಾರ. ಸೈಬರ್ಅಪರಾಧ, ಡಿಜಿಟಲ್ ಯುಗದಲ್ಲಿ ಬೆಳೆಯುತ್ತಿದ್ದು, ಆನ್ಲೈನ್ ಕಳ್ಳತಿಗಳಿಂದ ಗುಪ್ತಚರಂಚನೆಯ ತನಿಖೆಗೆ ಸಾಗುತ್ತಿದೆ. ಹಿಂಸೆ, ಲೂಟ, ದಳವಾಯಿ, ಕೈಗಾರಿಕೆ, ಮಾದಕ ದ್ರವ್ಯ ಸಂಬಂಧಿತ ಅಪರಾಧಗಳು ಮತ್ತು ವಾಹನಗಳ ಸಂಬಂಧಿತ ಅಪರಾಧಗಳು ಪ್ರಮುಖವಾಗಿ ಕಂಡಿದ್ದು, ಸ್ಥಿತಿಯು 50 ರಿಂದ 1,500 ವರೆಗೆ ದಾಖಲಾಗಿದೆ. ತುರ್ತಿಯಾಗಿ ದಾಖಲಾಗದಿದ್ದರೂ, ನಗರದಲ್ಲಿ ಹತ್ತು ಮಾದರಿ ಹತ್ಯೆಗಳು ಜೋರಾಗಿದ್ದು, ನಿಜವಾದ ಹಿಂಸೆಗಳ ಗುರುತಿನಿಂದ ಕಾಣಿಸಿಕೊಂಡಿವೆ. ಈ ಪಟ್ಟಿಗಳು ಬೆಂಗಳೂರಿನ ಅಪರಾಧದ ಪ್ರವಾಹದ ಬಗ್ಗೆ ಪೊಲಿಸ್ ಇಲಾಖೆಗಳಿಗೆ ಮೌಲ್ಯಯುತ ಅಂಶಗಳನ್ನು ನೀಡುತ್ತವೆ, ಲಕ್ಷಿಸಿಕೊಳ್ಳಲು ಗುರಿಯಾಗಿದೆ."
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
  const handleChange = (event) => {
    setisLang(event.target.checked);
  };


 
  const [isLoading, setIsLoading] = useState(false);

  // ... (handleInputChange and other functions remain the same)

  const handleSend = () => {
    if (userInput) {
      setMessages([...messages, { text: userInput, sender: 'user' }]);
      setUserInput('');
      setIsLoading(true);

      // Simulate a 5-second delay before getting the bot response
      setTimeout(() => {
        // TODO: Replace this with your actual backend call to get bot response
        const botResponse = { text: isLang ? ktext : text, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
        setIsLoading(false);
      }, 5000);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
      <FormControlLabel
      control={
        <Checkbox
          checked={isLang}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label="Kannada"
    />
      
    <Grid container direction="column">
      {/* Chat History */}
      <Grid item xs={12}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={message.text} 
                secondary={message.sender === 'user' ? 'You' : 'Bot'}
                align={message.sender === 'user' ? 'right' : 'left'} 
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      {/* User Input */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
          {isLoading && <CircularProgress />}
            <TextField 
              label="Enter message" 
              variant="outlined" 
              fullWidth 
              value={userInput} 
              onChange={handleInputChange} 
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleSend} disabled={isLoading}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

      </MDBox>
    </DashboardLayout>
  );
}

export default Billing;
