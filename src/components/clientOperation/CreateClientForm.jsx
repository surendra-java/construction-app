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

const CreateClientForm = ({ isOpen, onClose, onClientCreated }) => {
    console.log("create form");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [clientPhoto, setClientPhoto] = useState(null); // state for the selected photo

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
      const handleSave = async () => {
        const formData = new FormData();
        formData.append("clientName", name);
        formData.append("clientMobileNumber", mobileNumber);
        formData.append("clientAddress", address);
        formData.append("clientPhoto", clientPhoto);
    
        try {
          const response = await fetch(`http://localhost:8080/create-client`, {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            const createdClient = await response.json();
            onClientCreated()
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
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              onChange={handleNameChange} 
              fullWidth 
            />
            <TextField
              autoFocus
              margin="dense"
              label="Phone Number"
              onChange={handleClientMobNbrChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Address"
              onChange={handleClientAddressChange}
              fullWidth
            />
          </DialogContent>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />{" "}
          <DialogActions>
            <Button color="secondary" onClick={onClose}>Cancel</Button>
            <Button color="primary" onClick={handleSave} >Save</Button>
          </DialogActions>
        </Dialog>
      );
}
export default CreateClientForm;