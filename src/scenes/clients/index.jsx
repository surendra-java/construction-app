import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditClientForm from "../../components/clientOperation/EditClientForm";
import CreateClientForm from "../../components/clientOperation/CreateClientForm";
import ClientInfoForm from "../../components/clientOperation/ClientInfoForm";

import { useTheme } from "@mui/material";
import axios from "axios";

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const [isCreate, setIsCreate] = useState(false);
 

  useEffect(() => {
    axios
      .get("http://localhost:8080/client-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.clientId,
        }));
        console.log("rows with ids:", rowsWithIds);
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleDeleteClick = (params) => {
    const clientId = params.row.clientId;
    const confirm = window.confirm(
      "Are you sure. you want to delete this client"
    );
    if (confirm) {
      axios
        .delete(`http://localhost:8080/client-delete?clientId=${clientId}`)
        .then((response) => {
          // handle the response as needed
          setRows((prevRows) =>
            prevRows.filter((row) => row.clientId !== clientId)
          );
          console.log(`Deleted client ${clientId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCreateClick = () => {
    console.log("create new client button click");
    setIsCreate(true);
    setIsPopupOpen(true);
    setSelectedClient(null); // reset selected client
  };

  const handleEditClick = (params) => {
    console.log("handleEditClick");
    const client = params.row;
    const clientId = client.id;
    setIsPopupOpen(true);
    setIsCreate(false);
   
    axios
      .get(`http://localhost:8080/client-info?clientId=${clientId}`)
      .then((response) => {
        setSelectedClient(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      setSelectedClient(null);
  };
  
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedClient(null);
  };

  const handleClientCreated = () => {
    axios
      .get("http://localhost:8080/client-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.clientId,
        }));
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClientUpdated = () => {
    axios
      .get("http://localhost:8080/client-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.clientId,
        }));
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "clientName", headerName: "Name", flex: 1, cellClassName: "name-column--cell",},
    { field: "clientMobNbr", headerName: "Phone Number", flex: 1 },
    { field: "clientAddress", headerName: "Address", flex: 1 },
    { field: "actions", headerName: "Actions", flex: 0.5, sortable: false,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          const clientId = params.row.clientId;
          const confirm = window.confirm(
            "Are you sure. you want to delete this client"
          );
          if (confirm) {
            axios
              .delete(
                `http://localhost:8080/client-delete?clientId=${clientId}`
              )
              .then((response) => {
                // handle the response as needed
                setRows((prevRows) =>
                  prevRows.filter((row) => row.clientId !== clientId)
                );
                console.log(`Deleted client ${clientId}`);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        };
        
        const handleClientInfoClick = () => {
          console.log("Client info button clicked");
          setIsPopupOpen(false);
          const client = params.row;
          setSelectedClient(client);
          navigate(`/ClientInfoForm?clientId=${client.id}`);
        };

        return (
          <Box>
            <IconButton aria-label="edit" onClick={() => handleEditClick(params)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="info" onClick={handleClientInfoClick}>
              <PersonIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="10px">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Reference"/>
      <Box height="70vh" sx={{"& .MuiDataGrid-root": {border: "none",},
          "& .MuiDataGrid-cell": {borderBottom: "none",},
          "& .name-column--cell": {color: colors.greenAccent[300],},
          "& .MuiDataGrid-columnHeaders": {backgroundColor: colors.blueAccent[700],borderBottom: "none",},
          "& .MuiDataGrid-virtualScroller": {backgroundColor: colors.primary[400],},
          "& .MuiDataGrid-footerContainer": {borderTop: "none", backgroundColor: colors.blueAccent[700],},
          "& .MuiCheckbox-root": {color: `${colors.greenAccent[200]} !important`,},
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {color: `${colors.grey[100]} !important`,},
        }}>

        <Box sx={{ display: "flex"}}>
          <Button variant="contained" color="primary" 
            onClick={handleCreateClick}>
            Create Client
          </Button>
        </Box>
        <div style={{ height: 480, maxWidth: '100%', margin: 'auto' }}>
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
        </div>
      </Box>
      {isPopupOpen && selectedClient ? (
        <EditClientForm
          isOpen={isPopupOpen}
          client={selectedClient}
          onClose={handlePopupClose}
          onClientUpdated = {handleClientUpdated}
        />
      ) : isCreate && (
        <CreateClientForm
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          onClientCreated = {handleClientCreated}
        />
      )}
   </Box>
  );
};

export default Clients;
