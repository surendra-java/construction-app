import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  
  import Header from "../../components/Header";
  const CreateSupervisorForm = ({ isOpen, onClose, onSupervisorCreated }) => {
    console.log("Create Supervisor form");
    const [supervisorName, setSupervisorName] = useState("");
    const [supervisorAddress, setSupervisorAddress] = useState("");
    const [supervisorMobileNumber, setSupervisorMobNbr] = useState("");
    const [supervisorPhoto, setSupervisorPhoto] = useState(null); // state for the selected photo
  
    const handleSupervisorNameChange = (event) => {
        setSupervisorName(event.target.value);
    };
  
    const handleSupervisorAddressChange = (event) => {
        setSupervisorAddress(event.target.value);
    };
  
    const handleSupervisorMobNbrChange = (event) => {
        setSupervisorMobNbr(event.target.value);
    };
  
  
    const handleSupervisorPhotoChange = (event) => {
        setSupervisorPhoto(event.target.files[0]);
    };
  
    const handleSave = async () => {
      const formData = new FormData();
      formData.append("supervisorName", supervisorName);
      formData.append("supervisorAddress", supervisorAddress);
      formData.append("supervisorMobileNumber", supervisorMobileNumber);
      formData.append("supervisorPhoto", supervisorPhoto);
  
      try {
        const response = await fetch(`http://localhost:8080/create-supervisor`, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const createdSupervisor = await response.json();
          onSupervisorCreated()
          onClose();
        } else {
          console.error(`Failed to create Supervisor`);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Dialog open={isOpen} onClose={onClose}>
        
        <DialogTitle>
          <Header title="CREATE SUPERVISOR" subtitle="Create a New Supervisor Profile" />
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            onChange={handleSupervisorNameChange} 
            fullWidth 
          />
          <TextField
            autoFocus
            margin="dense"
            label="Supervisor Address"
            onChange={handleSupervisorAddressChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Contact"
            onChange={handleSupervisorMobNbrChange}
            fullWidth
          />
           
        </DialogContent>
        <input type="file" accept="image/*" onChange={handleSupervisorPhotoChange} />{" "}
        <DialogActions>
          <Button color="secondary" onClick={onClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave} >Save</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  
  export default CreateSupervisorForm;
  