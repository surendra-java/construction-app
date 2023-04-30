import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";

import Header from "../../components/Header";
const CreateSiteForm = ({ isOpen, onClose, onSiteCreated }) => {
  console.log("Create Site form");
  const [siteName, setSiteName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [siteWard, setSiteWard] = useState("");
  const [siteCity, setSiteCity] = useState("");
  const [sitePin, setSitePin] = useState("");
  const [sitePhoto, setSitePhoto] = useState(null); 

  const [client, setClientId] = useState("");
  const [allClientOptions, setAllClientOptions] = useState([]);

  
  
  const handleClineIdChange = (event) => {
    setClientId(event.target.value);
  };

  const handSiteNameChange = (event) => {
    setSiteName(event.target.value);
  };

  const handleSiteAddressChange = (event) => {
    setSiteAddress(event.target.value);
  };

  const handleSiteWardChange = (event) => {
    setSiteWard(event.target.value);
  };

  const handleSiteCityChange = (event) => {
    setSiteCity(event.target.value);
  };

  const handleSitePinChange = (event) => {
    setSitePin(event.target.value);
  };


  const handlePhotoChange = (event) => {
    setSitePhoto(event.target.files[0]);
  };

  useEffect(() => {
    // fetch the progress options for the first dropdown
    fetch("http://localhost:8080/client-all-info")
      .then((response) => response.json())
      .then((data) => {
        setAllClientOptions(data);
      })
      .catch((error) => {
        console.error(error);
      });
   }, []);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("client", client);
    formData.append("siteName", siteName);
    formData.append("siteAddress", siteAddress);
    formData.append("siteWard", siteWard);
    formData.append("siteCity", siteCity);
    formData.append("sitePin", sitePin);
    formData.append("sitePhoto", sitePhoto);

    try {
      const response = await fetch(`http://localhost:8080/create-site`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const createdSite = await response.json();
        onSiteCreated()
        onClose();
      } else {
        console.error(`Failed to create site`);
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
          label="Client Name"
          margin="dense"
          onChange={handleClineIdChange}
          fullWidth
        >
          {allClientOptions.map((option) => (
            <MenuItem
              key={option.clientId}
              value={option.clientId}
            >
              {option.clientName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Site Name"
          onChange={handSiteNameChange} 
          fullWidth 
        />
        <TextField
          autoFocus
          margin="dense"
          label="Site Address"
          onChange={handleSiteAddressChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Site Ward"
          onChange={handleSiteWardChange}
          fullWidth
        />
         <TextField
          autoFocus
          margin="dense"
          label="Site City"
          onChange={handleSiteCityChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Site Pin"
          onChange={handleSitePinChange}
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
};


export default CreateSiteForm;
