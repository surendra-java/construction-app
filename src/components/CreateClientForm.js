import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper } from '@material-ui/core';

const CreateClientForm = () => {
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientPhoto, setClientPhoto] = useState(null);

  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
  };

  const handleClientAddressChange = (event) => {
    setClientAddress(event.target.value);
  };

  const handleClientPhotoChange = (event) => {
    setClientPhoto(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('clientName', clientName);
    formData.append('clientAddress', clientAddress);
    formData.append('clientPhoto', clientPhoto);

    // send a POST request to the server
    fetch('http://localhost:8080/create-client', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Client Name"
                value={clientName}
                onChange={handleClientNameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Client Address"
                value={clientAddress}
                onChange={handleClientAddressChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleClientPhotoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Create Client
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default CreateClientForm;
