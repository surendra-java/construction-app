import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";

import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

const EditClientForm = ({ isOpen, onClose, client, onClientUpdated }) => {
  console.log("update form");
  const [currentProgress, setCurrentProgress] = useState(client?.clientProgressMasterId || "");
  const [currentStatus, setCurrentStatus] = useState(client?.clientProgressStatusId || "");
  const [currentProgressOptions, setCurrentProgressOptions] = useState([]);
  const [currentStatusOptions, setCurrentStatusOptions] = useState([]);
  const clientId = client.clientId;
  const [name, setName] = useState(client.clientName);
  const [mobileNumber, setMobileNumber] = useState(client.clientMobNbr);
  const [address, setAddress] = useState(client.clientAddress);
  const [clientPhoto, setClientPhoto] = useState(client.clientPhoto);

  const handleCurrentProgressChange = (event) => {
    setCurrentProgress(event.target.value);
  };

  const handleCurrentStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleClientMobNbrChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleClientAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePhotoChange = (event) => {
    setClientPhoto(event.target.files[0]);
  };

  useEffect(() => {
    // fetch the progress options for the first dropdown
    fetch("http://localhost:8080/all-client-progress")
      .then((response) => response.json())
      .then((data) => {
        setCurrentProgressOptions(data);
      })
      .catch((error) => {
        console.error(error);
      });

    // fetch the initial progress options for the second dropdown
    fetch("http://localhost:8080/all-client--status")
      .then((response) => response.json())
      .then((data) => {
        setCurrentStatusOptions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSave = async () => {
    const formData = new FormData();
    
    console.log("clientId", clientId);
    
    formData.append("clientId", clientId);
    formData.append("clientName", name);
    formData.append("clientMobileNumber", mobileNumber);
    formData.append("clientAddress", address);
    formData.append("clientProgressMasterId", currentProgress);
    formData.append("clientProgressStatusId", currentStatus);
    formData.append("clientPhoto", clientPhoto);

    try {
      const response = await fetch(`http://localhost:8080/update-client`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const createdClient = await response.json();
        onClientUpdated();
        onClose();
      } else {
        console.error(`Failed to create client`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Header title="CREATE CLIENT" subtitle="Create a New Client Profile" />
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Current Progress"
          value={currentProgress}
          margin="dense"
          onChange={handleCurrentProgressChange}
          fullWidth
        >
          {currentProgressOptions.map((option) => (
            <MenuItem
              key={option.clientProgressMasterId}
              value={option.clientProgressMasterId}
            >
              {option.clientProgressName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Current Status"
          margin="dense"
          value={currentStatus}
          onChange={handleCurrentStatusChange}
          fullWidth
        >
          {currentStatusOptions.map((option) => (
            <MenuItem
              key={option.clientProgressStatusId}
              value={option.clientProgressStatusId}
            >
              {option.clientProgressStatusName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Phone Number"
          value={mobileNumber}
          onChange={handleClientMobNbrChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Address"
          value={address}
          onChange={handleClientAddressChange}
          fullWidth
        />
      </DialogContent>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />{" "}
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditClientForm;
