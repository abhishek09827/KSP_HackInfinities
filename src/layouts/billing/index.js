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
