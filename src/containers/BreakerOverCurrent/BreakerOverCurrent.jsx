import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Chip,
  Typography,
  ToggleButton,
  // Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  useMediaQuery,
} from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";
import { ReportingBar } from "../../components/common/ReportingBar";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import PduSelect from "../../components/common/PDUSelect";
import ConfigContext from "../../components/common/ConfigContext";
import styled from "@emotion/styled";
import Dialog from "../../components/common/DialogWithClose";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WarningIcon from "@mui/icons-material/Warning";

function SensorDialog({ open, onClose, checked }) {
  const { config } = React.useContext(ConfigContext);
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>{checked.filter((value) => value === true).length} Selected Sensors</DialogTitle>
      <Box sx={{ p: 0.5 }} />
      <DialogContent>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            sx={{ margin: "auto", display: "flex", placeContent: "center" }}
          >
            <Grid item xs={12}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Checkbox checked />
                <TextField fullWidth label="Lower Critical" defaultValue="0.01" type="number" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Checkbox />
                <TextField fullWidth label="Lower Warning" defaultValue="0" type="number" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Checkbox checked />
                <TextField fullWidth label="Upper Warning" defaultValue="13" type="number" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Checkbox checked />
                <TextField fullWidth label="Upper Critical" defaultValue="16" type="number" />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Deassertion hysteresis" defaultValue="1" type="number" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Assertion timeout" defaultValue="0" type="number" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

function BreakerOverCurrent() {
  const isMdScreen = useMediaQuery("(min-width:1450px)");
  const { config, setConfig, allConfig } = React.useContext(ConfigContext);
  const [checked, setChecked] = useState([false, false, false]);
  const [settingsEdit, setsettingsEdit] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCheckboxChange = (position) => {
    const updatedChecked = checked.map((item, index) => (index === position ? !item : item));
    setChecked(updatedChecked);
  };

  const handleDialogOpen = () => {
    if (checked.some((item) => item)) {
      setsettingsEdit(!settingsEdit);
      setDialogOpen(true);
    } else {
      alert("Please select a breaker to edit");
    }
  };

  const handleDialogClose = () => {
    setsettingsEdit(!settingsEdit);
    setDialogOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
  }));

  const getStatusChip = (status) => {
    return (
      <Chip
        label={status}
        style={{ backgroundColor: status === "OPEN" ? "green" : "red", color: "white" }}
        icon={status === "OPEN" ? <ThumbUpAltIcon /> : <WarningIcon />}
        sx={{
          "& .MuiChip-label": {
            fontWeight: 600,
            textTransform: "uppercase",
            display: !isMdScreen ? "none" : "inline-block",
            paddingLeft: "5px",
          },
          "& .MuiChip-icon": {
            marginRight: !isMdScreen ? "0px" : "0px",
            marginLeft: !isMdScreen ? "0px" : "5px",
          },
          width: "40%",
          minWidth: !isMdScreen ? "50px" : "100px",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <NamedContainer
        overridetitle
        title={
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="600">
              Breaker Overcurrent Protection
            </Typography>
            <PduSelect />
            <ToggleButton
              value="settingsEdit"
              selected={settingsEdit}
              onChange={handleDialogOpen}
              sx={{
                padding: "0px",
                paddingRight: "5px",
                paddingLeft: "5px",
                borderRadius: "5px",
                textTransform: "none",
                border: "1px solid rgba(0, 0, 0, 0.87)",
              }}
              color="primary"
            >
              <Typography
                variant=""
                fontWeight="400"
                sx={{ marginRight: "5px" }}
                //   color={settingsEdit ? "red" : "blue"}
              >
                Edit Settings
              </Typography>
              {settingsEdit ? <FaLockOpen color="red" /> : <FaLock color="#FFD700" />}
            </ToggleButton>
          </div>
        }
      >
        <TableContainer>
          <Table aria-label="PDU table">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={checked.some((item) => item) && !checked.every((item) => item)}
                    checked={checked.every((item) => item)}
                    onChange={() => setChecked(checked.map(() => true))}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">PDU</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">RMS Current</StyledTableCell>
                <StyledTableCell align="center">Max Current</StyledTableCell>
                <StyledTableCell align="center">Protected Outlets</StyledTableCell>
                <StyledTableCell align="center">Lines</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {config["circuitBreakerNames"].map((name, index) => (
                <TableRow key={index}>
                  <StyledTableCell padding="checkbox">
                    <Checkbox checked={checked[index]} onChange={() => handleCheckboxChange(index)} />
                  </StyledTableCell>
                  <StyledTableCell align="center">{name}</StyledTableCell>
                  <StyledTableCell align="center">PDU name</StyledTableCell>
                  <StyledTableCell align="center">{getStatusChip(index % 2 === 0 ? "OPEN" : "CLOSED")}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ minWidth: "150px" }}>
                    <div>
                      <div>{index}/ 16 A</div>
                      <ReportingBar value={index} />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{index} A</StyledTableCell>
                  <StyledTableCell align="center" sx={{ whiteSpace: "normal", wordWrap: "break-word", width: "100px" }}>
                    {config["protectedOutlet"][`${name}`].join(", ")}
                  </StyledTableCell>
                  <StyledTableCell align="center">{config["circuitBreakerLines"][`${name}`]}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </NamedContainer>
      <SensorDialog open={isDialogOpen} onClose={handleDialogClose} checked={checked} />
    </Box>
  );
}

export default BreakerOverCurrent;
