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
import Header from "../Header";

const EditSupervisorForm = ({ isOpen, onClose, supervisor, onSupervisorUpdated }) => {
    console.log("update supervisor form");
    
    const supervisorMasterId = supervisor.supervisorMasterId;
    console.log(supervisor);
    const [supervisorName, setSupervisorName] = useState(supervisor.supervisorName);
    const [supervisorAddress, setSupervisorAddress] = useState(supervisor.supervisorAddress);
    const [supervisorMobileNumber, setSupervisorMobileNumber] = useState(supervisor.supervisorMobNbr);
    const [supervisorPhoto, setSupervisorPhoto] = useState(supervisor.supervisorPhoto);
    
    const handleSupervisorNameChange = (event) => {
        setSupervisorName(event.target.value);
    };
  
    const handleSupervisorAddressChange = (event) => {
        setSupervisorAddress(event.target.setSupervisorAddressvalue);
    };
  
    const handleSupervisorMobNbrChange = (event) => {
        setSupervisorMobileNumber(event.target.value);
    };
  
  
    const handleSupervisorPhotoChange = (event) => {
        setSupervisorPhoto(event.target.files[0]);
    };
  
  
   
    const handleSave = async () => {
      const formData = new FormData();
      
      console.log("supervisorMasterId", supervisorMasterId);
      formData.append("supervisorMasterId", supervisorMasterId);
      formData.append("supervisorName", supervisorName);
      formData.append("supervisorAddress", supervisorAddress);
      formData.append("supervisorMobileNumber", supervisorMobileNumber);
      formData.append("supervisorPhoto", supervisorPhoto);
  
      try {
        const response = await fetch(`http://localhost:8080/update-supervisor`, {
          method: "PUT",
          body: formData,
        });
  
        if (response.ok) {
          const createdSupervisor = await response.json();
          onSupervisorUpdated();
          onClose();
        } else {
          console.error(`Failed to update Supervisor`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
   
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          <Header title="Edit Supervisor" subtitle="Edit a Supervisor Profile" />
        </DialogTitle>
        <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          value={supervisorName}
          onChange={handleSupervisorNameChange} 
          fullWidth 
        />
        <TextField
          autoFocus
          margin="dense"
          label="Supervisor Address"
          value={supervisorAddress}
          onChange={handleSupervisorAddressChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Contact"
          value={supervisorMobileNumber}
          onChange={handleSupervisorMobNbrChange}
          fullWidth
        />
        
      </DialogContent>
        <input type="file" accept="image/*" onChange={handleSupervisorPhotoChange} />{" "}
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
  
  export default EditSupervisorForm;
  