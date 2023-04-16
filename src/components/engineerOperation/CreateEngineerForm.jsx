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
  const CreateEngeerForm = ({ isOpen, onClose, onEngineerCreated }) => {
    console.log("Create Engineer form");
    const [engineerName, setEngineerName] = useState("");
    const [engineerAddress, setEngineerAddress] = useState("");
    const [engineerMobileNumber, setEngineerMobNbr] = useState("");
    const [engineerPhoto, setEngineerPhoto] = useState(null); // state for the selected photo
  
    const handleEngineerNameChange = (event) => {
        setEngineerName(event.target.value);
    };
  
    const handleEngineerAddressChange = (event) => {
        setEngineerAddress(event.target.value);
    };
  
    const handleEngineerMobNbrChange = (event) => {
        setEngineerMobNbr(event.target.value);
    };
  
  
    const handleEngineerPhotoChange = (event) => {
        setEngineerPhoto(event.target.files[0]);
    };
  
    const handleSave = async () => {
      const formData = new FormData();
      formData.append("engineerName", engineerName);
      formData.append("engineerAddress", engineerAddress);
      formData.append("engineerMobileNumber", engineerMobileNumber);
      formData.append("engineerPhoto", engineerPhoto);
  
      try {
        const response = await fetch(`http://localhost:8080/create-engineer`, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const createdEngineer = await response.json();
          onEngineerCreated()
          onClose();
        } else {
          console.error(`Failed to create engineer`);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Dialog open={isOpen} onClose={onClose}>
        
        <DialogTitle>
          <Header title="CREATE ENGINEER" subtitle="Create a New Engineer Profile" />
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            onChange={handleEngineerNameChange} 
            fullWidth 
          />
          <TextField
            autoFocus
            margin="dense"
            label="Engineer Address"
            onChange={handleEngineerAddressChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Contact"
            onChange={handleEngineerMobNbrChange}
            fullWidth
          />
           
        </DialogContent>
        <input type="file" accept="image/*" onChange={handleEngineerPhotoChange} />{" "}
        <DialogActions>
          <Button color="secondary" onClick={onClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave} >Save</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  
  export default CreateEngeerForm;
  