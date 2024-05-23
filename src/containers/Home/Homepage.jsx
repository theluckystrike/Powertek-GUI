import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Chip,
  Box,
  ToggleButton,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import Dialog from "../../components/common/DialogWithClose";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { FaLockOpen, FaLock } from "react-icons/fa";
import NamedContainer from "../../components/common/NamedContainer";
import InletStats from "../../components/homepage/InletStats";
import CircuitBreakerStatus from "../../components/homepage/CircuitBreakerStatus";
import ConfigContext from "../../components/common/ConfigContext";
import PDUSelect from "../../components/common/PDUSelect";
import { useTheme } from "@emotion/react";
import AlarmListTab from "./AlarmListTab";
import axios from "axios";

function HomePage(props) {
  const { config, setConfig } = useContext(ConfigContext);

  const [open, setOpen] = useState(false);
  const [settingsEdit, setSettingsEdit] = useState(false);
  const [stats, setStats] = useState([]);
  const [currentMap, setCurrentMap] = useState({});
  const [circuitBreakerMap, setCircuitBreakerMap] = useState({});
  const [outletStatus, setOutletStatus] = useState([]);
  const [value, setValue] = useState(0);

  const outletWarningThreshold = config[`outletWarningThreshold`];
  const outletErrorThreshold = config[`outletErrorThreshold`];
  const circuitBreakerNumber = config[`circuitBreakerNames`].length;
  const maxCurrent = config[`maxBreakerCurrent`];

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/HomePageData");
      const data = response.data;
      console.log(data);
      setStats(data.stats);
      setCurrentMap(data.currentMap);
      setCircuitBreakerMap(data.circuitBreakerMap);
      setOutletStatus(data.outletStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [config]);

  const handleClickOpen = () => {
    setOpen(true);
    setSettingsEdit(!settingsEdit);
  };

  const handleClose = () => {
    setOpen(false);
    setSettingsEdit(!settingsEdit);
  };

  const handleSave = () => {
    console.log("Threshold saved");
    handleClose();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={circuitBreakerNumber <= 12 ? 8 : 12} md={12} xs={12}>
              <NamedContainer
                overridetitle
                title={
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="600">
                      INLET STATUS
                    </Typography>
                    <PDUSelect />
                  </div>
                }
              >
                <InletStats
                  maxCurrent={32}
                  minCurrent={0}
                  currentMap={currentMap}
                  stats={stats}
                  realPower={4.2}
                  apparentPower={12.4}
                />
              </NamedContainer>
            </Grid>
            <Grid item lg={circuitBreakerNumber <= 12 ? 4 : 12} md={12} xs={12}>
              <NamedContainer title="CIRCUIT BREAKER STATUS">
                <CircuitBreakerStatus circuitBreakerMap={circuitBreakerMap} minCurrent={0} maxCurrent={maxCurrent} />
              </NamedContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <NamedContainer title="OUTLET STATUS">
            <Grid
              container
              spacing={1}
              sx={{ display: "flex", alignContent: "center", justifyContent: "space-between", alignItems: "center" }}
            >
              {outletStatus.map((outlet, key) => (
                <Grid
                  key={key}
                  item
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    sx={{ "& .MuiChip-label": { fontWeight: 600 }, width: "200px" }}
                    icon={<OfflineBoltIcon />}
                    color={outlet[`Status`]}
                    label={`${outlet["Label"]} (${outlet["Current"]} A)`}
                    clickable={true}
                  />
                </Grid>
              ))}
            </Grid>
          </NamedContainer>
        </Grid>

        <Grid item xs={12}>
          <NamedContainer
            overridetitle
            title={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "end",
                  alignItems: { xs: "start", sm: "center" },
                }}
              >
                <ToggleButton
                  value="settingsEdit"
                  selected={settingsEdit}
                  onChange={handleClickOpen}
                  sx={{
                    padding: "0px",
                    paddingRight: "5px",
                    paddingLeft: "5px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "5px",
                    textTransform: "none",
                    border: "1px solid rgba(0, 0, 0, 0.87)",
                  }}
                  color="primary"
                >
                  <Typography variant="body2" fontWeight="400" sx={{ marginRight: "5px" }}>
                    Edit Settings
                  </Typography>
                  {settingsEdit ? <FaLockOpen color="red" /> : <FaLock color="#FFD700" />}
                </ToggleButton>
              </Box>
            }
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight="600" sx={{ width: { xs: "100%", sm: "30%" }, textAlign: "center" }}>
                Residual Current : 0.0 mA <Chip label="Normal" color="success" />
              </Typography>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Set Alarm Threshold</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="threshold"
                    label="Alarm Threshold (mA)"
                    type="number"
                    fullWidth
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>

              <Typography variant="h5" fontWeight="600" sx={{ width: { xs: "100%", sm: "39%" }, textAlign: "center" }}>
                Power Share : <Chip label="Active/Backup Power" color="error" />
              </Typography>

              <Typography variant="h5" fontWeight="600" sx={{ width: { xs: "100%", sm: "30%" } }}>
                Over Voltage Protection : <Chip sx={{ mx: 1 }} label="Activated" color="error" />
              </Typography>
            </Box>
          </NamedContainer>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={12} sx={{ width: "100%" }}>
              <NamedContainer
                overridetitle
                title={
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="600">
                      EMD Information
                    </Typography>
                    <Chip
                      sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                      label={`EMD 1`}
                      clickable={true}
                    />
                  </div>
                }
              ></NamedContainer>
            </Grid>
            <Grid item lg={8} md={12} sx={{ width: "100%" }}>
              <NamedContainer title="PlaceHolder"></NamedContainer>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <NamedContainer title="Alarms">
            <AlarmListTab />
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
