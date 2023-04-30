import { useEffect, useState, useCallback } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";

const SupervisorInfoForm = () => {
    const location = useLocation();
    const [supervisor, setSupervisor] = useState(null);
    const supervisorMasterId = new URLSearchParams(location.search).get("supervisorMasterId");
    console.log("supervisorMasterId", supervisorMasterId)
    useEffect(() => {
      axios
        .get(`http://localhost:8080/supervisor-info?supervisorMasterId=${supervisorMasterId}`)
        .then((response) => {
          console.log("supervisor response data: ", response.data);
          setSupervisor(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [supervisorMasterId]);

    return (
        <Box m="10px">
          <Header title="Supervisor Info" subtitle="Information of Selected Supervisor" />
          <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
            <Box sx={{ marginRight: "20px" }}>
              <img
                src={`data:image/png;base64,${supervisor && supervisor.supervisorPhoto}`}
                style={{width: 100, height: 100, borderRadius: 100/ 2}}
              />
            </Box>
            <Box>
              <Typography variant="h4" component="h2" mb="10px">
                {supervisor && supervisor.supervisorName}
              </Typography>
              
              <Typography variant="body1" component="p" mb="10px">
                Address: {supervisor && supervisor.supervisorAddress}
              </Typography>

              <Typography variant="body1" component="p" mb="10px">
                Contact: {supervisor && supervisor.supervisorMobNbr}
              </Typography>

              
            </Box>
          </Box>
    
          
          
        </Box>
      );
    
};
export default SupervisorInfoForm;