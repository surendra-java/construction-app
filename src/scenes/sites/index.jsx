import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditSiteForm from "../../components/siteOperation/EditSiteForm";
import CreateSiteForm from "../../components/siteOperation/CreateSiteForm";
import { useTheme } from "@mui/material";
import axios from "axios";

const Sites = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/site-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.siteMasterId,
        }));
        console.log("rows with ids:", rowsWithIds);
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteClick = (params) => {
    const siteMasterId = params.row.clientId;
    const confirm = window.confirm(
      "Are you sure. you want to delete this client"
    );
    if (confirm) {
      axios
        .delete(`http://localhost:8080/site-delete?clientId=${siteMasterId}`)
        .then((response) => {
          // handle the response as needed
          setRows((prevRows) =>
            prevRows.filter((row) => row.siteMasterId !== siteMasterId)
          );
          console.log(`Deleted siteId ${siteMasterId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCreateClick = () => {
    console.log("create new site button click");
    setIsCreate(true);
    setIsPopupOpen(true);
    setSelectedSite(null); // reset selected client
  };

  const handleEditClick = (params) => {
    console.log("handleEditClick");
    const siteMaster = params.row;
    const siteMasterId = siteMaster.id;
    setIsPopupOpen(true);
    setIsCreate(false);

    axios
      .get(`http://localhost:8080/site-info?siteMasterId=${siteMasterId}`)
      .then((response) => {
        setSelectedSite(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setSelectedSite(null);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedSite(null);
  };

  const handleSiteCreated = () => {
    axios
      .get("http://localhost:8080/site-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.siteMasterId,
        }));
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSiteUpdated = () => {
    axios
      .get("http://localhost:8080/site-all-info")
      .then((response) => {
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row.siteMasterId,
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
      field: "siteName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "siteAddress", headerName: "Address", flex: 1 },
    { field: "siteCity", headerName: "City", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          const siteMasterId = params.row.siteMasterId;
          const confirm = window.confirm(
            "Are you sure. you want to delete this site"
          );
          if (confirm) {
            axios
              .delete(
                `http://localhost:8080/site-delete?siteMasterId=${siteMasterId}`
              )
              .then((response) => {
                // handle the response as needed
                setRows((prevRows) =>
                  prevRows.filter((row) => row.siteMasterId !== siteMasterId)
                );
                console.log(`Deleted site ${siteMasterId}`);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        };

        const handleSiteInfoClick = () => {
          console.log("Site info button clicked");
          setIsPopupOpen(false);
          const siteMaster = params.row;
        
          setSelectedSite(siteMaster);
          navigate(`/SiteInfoForm?siteMasterId=${siteMaster.id}`);
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
            <IconButton aria-label="info" onClick={handleSiteInfoClick}>
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
            Create Site
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
      {isPopupOpen && selectedSite ? (
        <EditSiteForm
          isOpen={isPopupOpen}
          site={selectedSite}
          onClose={handlePopupClose}
          onSiteUpdated={handleSiteUpdated}
        />
      ) : (
        isCreate && (
          <CreateSiteForm
            isOpen={isPopupOpen}
            onClose={handlePopupClose}
            onSiteCreated={handleSiteCreated}
          />
        )
      )}
    </Box>
  );
};
export default Sites;
