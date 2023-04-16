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

const EngineerInfoForm = () => {
    const location = useLocation();
    const [engineer, setEngineer] = useState(null);
    const engineerMasterId = new URLSearchParams(location.search).get("engineerMasterId");
    console.log("engineerMasterId", engineerMasterId)
    useEffect(() => {
      axios
        .get(`http://localhost:8080/engineer-info?engineerMasterId=${engineerMasterId}`)
        .then((response) => {
          console.log("engineer response data: ", response.data);
          setEngineer(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [engineerMasterId]);

    return (
        <Box m="10px">
          <Header title="Engineer Info" subtitle="Information of Selected Engineer" />
          <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
            <Box sx={{ marginRight: "20px" }}>
              <img
                src={`data:image/png;base64,${engineer && engineer.engineerPhoto}`}
                style={{width: 100, height: 100, borderRadius: 100/ 2}}
              />
            </Box>
            <Box>
              <Typography variant="h4" component="h2" mb="10px">
                {engineer && engineer.engineerName}
              </Typography>
              
              <Typography variant="body1" component="p" mb="10px">
                Address: {engineer && engineer.engineerAddress}
              </Typography>

              <Typography variant="body1" component="p" mb="10px">
                Contact: {engineer && engineer.engineerMobNbr}
              </Typography>

              
            </Box>
          </Box>
    
          
          
        </Box>
      );
    
};
export default EngineerInfoForm;