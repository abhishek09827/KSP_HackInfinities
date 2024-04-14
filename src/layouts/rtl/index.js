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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/rtl/data/reportsBarChartData";
import reportsLineChartData from "layouts/rtl/data/reportsLineChartData";

// RTL components
import Projects from "layouts/rtl/components/Projects";
import OrdersOverview from "layouts/rtl/components/OrdersOverview";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import { Container, Typography, Button } from '@mui/material';
function RTL() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [messages, setMessages] = useState("");

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setTimeout(() => {
      setMessages("Crime: Shooting");
    }, 2000);
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
      <Typography variant="h4" align="center" gutterBottom>
        {messages=="" ? "Video Upload" : messages}
      </Typography>
      

      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <input
            accept="video/*"
            id="video-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleVideoChange}
          />
          <label htmlFor="video-upload">
            <Button variant="contained" component="span">
              Select Video
            </Button>
          </label>
        </Grid>

        {videoUrl && (
          <Grid item xs={12}>
            <video width="50%" height="auto" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            
          </Grid>
          
        )}
        
          

        
      </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default RTL;
