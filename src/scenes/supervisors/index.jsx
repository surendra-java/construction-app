import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditSupervisorForm from "../../components/supervisorOperation/EditSupervisorForm";
import CreateSupervisorForm from "../../components/supervisorOperation/CreateSupervisorForm";
import { useTheme } from "@mui/material";
import axios from "axios";

const Supervisors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/supervisor-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.supervisorMasterId,
        }));
        console.log("rows with ids:", rowsWithIds);
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteClick = (params) => {
    const supervisorMasterId = params.row.supervisorMasterId;
    const confirm = window.confirm(
      "Are you sure. you want to delete this supervisor"
    );
    if (confirm) {
      axios
        .delete(`http://localhost:8080/supervisor-delete?supervisorMasterId=${supervisorMasterId}`)
        .then((response) => {
          // handle the response as needed
          setRows((prevRows) =>
            prevRows.filter((row) => row.supervisorMasterId !== supervisorMasterId)
          );
          console.log(`Deleted supervisorMasterId ${supervisorMasterId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCreateClick = () => {
    console.log("create new supervisor button click");
    setIsCreate(true);
    setIsPopupOpen(true);
    setSelectedSupervisor(null); // reset selected engineer
  };

  const handleEditClick = (params) => {
    console.log("handleEditClick");
    const supervisorMaster = params.row;
    const supervisorMasterId = supervisorMaster.id;
    setIsPopupOpen(true);
    setIsCreate(false);

    axios
      .get(`http://localhost:8080/supervisor-info?supervisorMasterId=${supervisorMasterId}`)
      .then((response) => {
        setSelectedSupervisor(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      setSelectedSupervisor(null);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedSupervisor(null);
  };

  const handleSupervisorCreated = () => {
    axios
      .get("http://localhost:8080/supervisor-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.supervisorMasterId,
        }));
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSupervisorUpdated = () => {
    axios
      .get("http://localhost:8080/supervisor-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.supervisorMasterId,
        }));
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "supervisorName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "supervisorAddress", headerName: "Address", flex: 1 },
    { field: "supervisorMobNbr", headerName: "Contact No.", flex: 1 },
    
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          const supervisorMasterId = params.row.supervisorMasterId;
          const confirm = window.confirm(
            "Are you sure. you want to delete this supervisor"
          );
          if (confirm) {
            axios
              .delete(
                `http://localhost:8080/supervisor-delete?supervisorMasterId=${supervisorMasterId}`
              )
              .then((response) => {
                // handle the response as needed
                setRows((prevRows) =>
                  prevRows.filter((row) => row.supervisorMasterId !== supervisorMasterId)
                );
                console.log(`Deleted supervisor ${supervisorMasterId}`);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        };

        const handleSupervisorInfoClick = () => {
          console.log("Supervisor info button clicked");
          setIsPopupOpen(false);
          const supervisorMaster = params.row;
        
          setSelectedSupervisor(supervisorMaster);
          navigate(`/SupervisorInfoForm?supervisorMasterId=${supervisorMaster.id}`);
        };

        return (
          <Box>
            <IconButton
              aria-label="edit"
              onClick={() => handleEditClick(params)}
            >
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="info" onClick={handleSupervisorInfoClick}>
              <PersonIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="10px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateClick}
          >
            Create Supervisor
          </Button>
        </Box>
        <div style={{ height: 480, maxWidth: "100%", margin: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </Box>
      {isPopupOpen && selectedSupervisor ? (
        <EditSupervisorForm
          isOpen={isPopupOpen}
          supervisor={selectedSupervisor}
          onClose={handlePopupClose}
          onSupervisorUpdated={handleSupervisorUpdated}
        />
      ) : (
        isCreate && (
          <CreateSupervisorForm
            isOpen={isPopupOpen}
            onClose={handlePopupClose}
            onSupervisorCreated={handleSupervisorCreated}
          />
        )
      )}
    </Box>
  );
};
export default Supervisors;
