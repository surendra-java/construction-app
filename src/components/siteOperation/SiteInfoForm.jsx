import { useEffect, useState, useCallback } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";

const SiteInfoForm = () => {
    const location = useLocation();
    const [site, setSite] = useState(null);
    const siteMasterId = new URLSearchParams(location.search).get("siteMasterId");
    console.log("siteMasterId", siteMasterId)
    useEffect(() => {
      axios
        .get(`http://localhost:8080/site-info?siteMasterId=${siteMasterId}`)
        .then((response) => {
          console.log("site response data: ", response.data);
          setSite(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [siteMasterId]);

    return (
        <Box m="10px">
          <Header title="Site Info" subtitle="Information of Selected Site" />
          <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
            <Box sx={{ marginRight: "20px" }}>
              <img
                src={`data:image/png;base64,${site && site.sitePhoto}`}
                style={{width: 100, height: 100, borderRadius: 100/ 2}}
              />
            </Box>
            <Box>
              <Typography variant="h4" component="h2" mb="10px">
                {site && site.siteName}
              </Typography>
              
              <Typography variant="body1" component="p" mb="10px">
                Address: {site && site.siteAddress}
              </Typography>

              <Typography variant="body1" component="p" mb="10px">
                Ward: {site && site.siteWard}
              </Typography>

              <Typography variant="body1" component="p" mb="10px">
                City: {site && site.siteCity}
              </Typography>

              <Typography variant="body1" component="p" mb="10px">
                Pin: {site && site.sitePin}
              </Typography>
            </Box>
          </Box>
    
          
          
        </Box>
      );
    
};
export default SiteInfoForm;