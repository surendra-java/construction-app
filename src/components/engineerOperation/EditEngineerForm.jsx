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

const EditEngineerForm = ({ isOpen, onClose, engineer, onEngineerUpdated }) => {
    console.log("update engineer form");
    
    const engineerMasterId = engineer.engineerMasterId;
    console.log(engineer);
    const [engineerName, setEngineerName] = useState(engineer.engineerName);
    const [engineerAddress, setEngineerAddress] = useState(engineer.engineerAddress);
    const [engineerMobileNumber, setEngineerMobileNumber] = useState(engineer.engineerMobNbr);
    const [engineerPhoto, setEngineerPhoto] = useState(engineer.engineerPhoto);
    
    const handleEngineerNameChange = (event) => {
        setEngineerName(event.target.value);
    };
  
    const handleEngineerAddressChange = (event) => {
        setEngineerAddress(event.target.value);
    };
  
    const handleEngineerMobNbrChange = (event) => {
        setEngineerMobileNumber(event.target.value);
    };
  
  
    const handleEngineerPhotoChange = (event) => {
        setEngineerPhoto(event.target.files[0]);
    };
  
  
   
    const handleSave = async () => {
      const formData = new FormData();
      
      console.log("engineerMasterId", engineerMasterId);
      formData.append("engineerMasterId", engineerMasterId);
      formData.append("engineerName", engineerName);
      formData.append("engineerAddress", engineerAddress);
      formData.append("engineerMobileNumber", engineerMobileNumber);
      formData.append("engineerPhoto", engineerPhoto);
  
      try {
        const response = await fetch(`http://localhost:8080/update-engineer`, {
          method: "PUT",
          body: formData,
        });
  
        if (response.ok) {
          const createdEngineer = await response.json();
          onEngineerUpdated();
          onClose();
        } else {
          console.error(`Failed to update engineer`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
   
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          <Header title="Edit Enginner" subtitle="Edit a Enginner Profile" />
        </DialogTitle>
        <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          value={engineerName}
          onChange={handleEngineerNameChange} 
          fullWidth 
        />
        <TextField
          autoFocus
          margin="dense"
          label="Engineer Address"
          value={engineerAddress}
          onChange={handleEngineerAddressChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Contact"
          value={engineerMobileNumber}
          onChange={handleEngineerMobNbrChange}
          fullWidth
        />
        
      </DialogContent>
        <input type="file" accept="image/*" onChange={handleEngineerPhotoChange} />{" "}
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
  
  export default EditEngineerForm;
  