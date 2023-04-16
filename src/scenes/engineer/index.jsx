import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditEngineerForm from "../../components/engineerOperation/EditEngineerForm";
import CreateEngineerForm from "../../components/engineerOperation/CreateEngineerForm";
import { useTheme } from "@mui/material";
import axios from "axios";

const Engineers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/engineer-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.engineerMasterId,
        }));
        console.log("rows with ids:", rowsWithIds);
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteClick = (params) => {
    const engineerMasterId = params.row.engineerMasterId;
    const confirm = window.confirm(
      "Are you sure. you want to delete this engineer"
    );
    if (confirm) {
      axios
        .delete(`http://localhost:8080/engineer-delete?engineerMasterId=${engineerMasterId}`)
        .then((response) => {
          // handle the response as needed
          setRows((prevRows) =>
            prevRows.filter((row) => row.engineerMasterId !== engineerMasterId)
          );
          console.log(`Deleted engineerMasterId ${engineerMasterId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCreateClick = () => {
    console.log("create new engineer button click");
    setIsCreate(true);
    setIsPopupOpen(true);
    setSelectedEngineer(null); // reset selected engineer
  };

  const handleEditClick = (params) => {
    console.log("handleEditClick");
    const engineerMaster = params.row;
    const engineerMasterId = engineerMaster.id;
    setIsPopupOpen(true);
    setIsCreate(false);

    axios
      .get(`http://localhost:8080/engineer-info?engineerMasterId=${engineerMasterId}`)
      .then((response) => {
        setSelectedEngineer(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      setSelectedEngineer(null);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedEngineer(null);
  };

  const handleEngineerCreated = () => {
    axios
      .get("http://localhost:8080/engineer-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.engineerMasterId,
        }));
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEngineerUpdated = () => {
    axios
      .get("http://localhost:8080/engineer-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.engineerMasterId,
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
      field: "engineerName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "engineerAddress", headerName: "Address", flex: 1 },
    { field: "engineerMobNbr", headerName: "Contact No.", flex: 1 },
    
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          const engineerMasterId = params.row.engineerMasterId;
          const confirm = window.confirm(
            "Are you sure. you want to delete this engineer"
          );
          if (confirm) {
            axios
              .delete(
                `http://localhost:8080/engineer-delete?engineerMasterId=${engineerMasterId}`
              )
              .then((response) => {
                // handle the response as needed
                setRows((prevRows) =>
                  prevRows.filter((row) => row.engineerMasterId !== engineerMasterId)
                );
                console.log(`Deleted engineer ${engineerMasterId}`);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        };

        const handleEngineerInfoClick = () => {
          console.log("Engineer info button clicked");
          setIsPopupOpen(false);
          const engineerMaster = params.row;
        
          setSelectedEngineer(engineerMaster);
          navigate(`/EngineerInfoForm?engineerMasterId=${engineerMaster.id}`);
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
            <IconButton aria-label="info" onClick={handleEngineerInfoClick}>
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
            Create Engineer
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
      {isPopupOpen && selectedEngineer ? (
        <EditEngineerForm
          isOpen={isPopupOpen}
          engineer={selectedEngineer}
          onClose={handlePopupClose}
          onEngineerUpdated={handleEngineerUpdated}
        />
      ) : (
        isCreate && (
          <CreateEngineerForm
            isOpen={isPopupOpen}
            onClose={handlePopupClose}
            onEngineerCreated={handleEngineerCreated}
          />
        )
      )}
    </Box>
  );
};
export default Engineers;
