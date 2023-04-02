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

const ClientInfoForm = () => {
  const location = useLocation();
  const [client, setClient] = useState(null);
  const [steps, setSteps] = useState([
    { label: "", progressId: null, completed: false },
    { label: "", progressId: null, completed: false },
    { label: "", progressId: null, completed: false },
    { label: "", progressId: null, completed: false },
    { label: "", progressId: null, completed: false },
    { label: "", progressId: null, completed: false },
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const clientId = new URLSearchParams(location.search).get("clientId");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/client-info?clientId=${clientId}`)
      .then((response) => {
        console.log("client response data: ", response.data);
        setClient(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clientId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/all-client-progress`)
      .then((response) => {
        console.log("all client progress data: ", response.data);
        const steps = response.data.map((progress) => {
          return {
            label: progress.clientProgressName,
            progressId: progress.clientProgressMasterId,
            completed: false,
          };
        });
        setSteps(steps);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const updateSteps = useCallback((clientProgress) => {
    setSteps((prevSteps) => {
      const updatedSteps = prevSteps.map((step) => {
        const isCompleted = clientProgress.some(
          (item) =>
            step.progressId === item.clientProgressMasterId &&
            item.clientProgressStatusId === 5
        );
        return { ...step, completed: isCompleted };
      });
      return updatedSteps;
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/client-progress?clientId=${clientId}`)
      .then((response) => {
        console.log("response data: ", response.data);
        const clientProgress = response.data;
        updateSteps(clientProgress);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clientId, updateSteps]);

  return (
    <Box m="10px">
      <Header title="Client Info" subtitle="Information of Selected Client" />
      <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
        <Box sx={{ marginRight: "20px" }}>
          <img
            src={`data:image/png;base64,${client && client.clientPhoto}`}
            style={{width: 100, height: 100, borderRadius: 100/ 2}}
          />
        </Box>
        <Box>
          <Typography variant="h4" component="h2" mb="10px">
            {client && client.clientName}
          </Typography>
          <Typography variant="h6" component="h3" mb="10px">
            Contact: {client && client.clientMobNbr}
          </Typography>
          <Typography variant="body1" component="p" mb="10px">
            Address: {client && client.clientAddress}
          </Typography>
        </Box>
      </Box>

      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} completed={step.completed}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
    </Box>
  );
};

export default ClientInfoForm;
