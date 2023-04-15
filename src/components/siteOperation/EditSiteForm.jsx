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

const EditSiteForm = ({ isOpen, onClose, site, onSiteUpdated }) => {
    console.log("update site form");
    
    const siteMasterId = site.siteMasterId;
    console.log(site);
    const [siteName, setSiteName] = useState(site.siteName);
    const [siteAddress, setSiteAddress] = useState(site.siteAddress);
    const [siteWard, setSiteWard] = useState(site.siteWard);
    const [siteCity, setSiteCity] = useState(site.siteCity);
    const [sitePin, setSitePin] = useState(site.sitePin);
    const [sitePhoto, setSitePhoto] = useState(site.sitePhoto);
    
    const handleSiteNameChange = (event) => {
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

         
    const handleSitePhotoChange = (event) => {
        setSitePhoto(event.target.files[0]);
    };
  
   
    const handleSave = async () => {
      const formData = new FormData();
      
      console.log("siteMasterId", siteMasterId);
      formData.append("siteMasterId", siteMasterId);
      formData.append("siteName", siteName);
      formData.append("siteAddress", siteAddress);
      formData.append("siteWard", siteWard);
      formData.append("siteCity", siteCity);
      formData.append("sitePin", sitePin);
      formData.append("sitePhoto", sitePhoto);
  
      try {
        const response = await fetch(`http://localhost:8080/update-site`, {
          method: "PUT",
          body: formData,
        });
  
        if (response.ok) {
          const createdSite = await response.json();
          onSiteUpdated();
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
          <Header title="Edit Site" subtitle="Edit a Site Profile" />
        </DialogTitle>
        <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Site Name"
          value={siteName}
          onChange={handleSiteNameChange} 
          fullWidth 
        />
        <TextField
          autoFocus
          margin="dense"
          label="Site Address"
          value={siteAddress}
          onChange={handleSiteAddressChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Site Ward"
          value={siteWard}
          onChange={handleSiteWardChange}
          fullWidth
        />
         <TextField
          autoFocus
          margin="dense"
          label="Site City"
          value={siteCity}
          onChange={handleSiteCityChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Site Pin"
          value={sitePin}
          onChange={handleSitePinChange}
          fullWidth
        />
      </DialogContent>
        <input type="file" accept="image/*" onChange={handleSitePhotoChange} />{" "}
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
  
  export default EditSiteForm;
  