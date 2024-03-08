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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";
import { ReportingBar } from "../../components/common/ReportingBar";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import PduSelect from "../../components/common/PDUSelect";

function SensorDialog({ open, onClose, checked }) {
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

  const getStatusChip = (status) => {
    return (
      <Chip
        label={status}
        style={{ backgroundColor: status === "OPEN" ? "green" : "red", color: "white" }}
        sx={{
          "& .MuiChip-label": { fontWeight: 600, textTransform: "uppercase" },
          width: "40%",
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <NamedContainer
        overridetitle
        title={
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="600">
              EDIT THRESHOLD
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
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={checked.some((item) => item) && !checked.every((item) => item)}
                    checked={checked.every((item) => item)}
                    onChange={() => setChecked(checked.map(() => true))}
                  />
                </TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">PDU</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">RMS Current</TableCell>
                <TableCell align="center">Max Current</TableCell>
                <TableCell align="center">Protected Outlets</TableCell>
                <TableCell align="center">Lines</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={checked[index]} onChange={() => handleCheckboxChange(index)} />
                  </TableCell>
                  <TableCell align="center">Circuit Breaker L{index + 1}</TableCell>
                  <TableCell align="center">PDU name</TableCell>
                  <TableCell align="center">{getStatusChip(index % 2 === 0 ? "OPEN" : "CLOSED")}</TableCell>
                  <TableCell align="center">
                    <div>
                      <div>{index}/ 16 A</div>
                      <ReportingBar value={index} />
                    </div>
                  </TableCell>
                  <TableCell align="center">{index} A</TableCell>
                  <TableCell align="center">{[1, 2, 3].map((n) => `${n + index * 3},`).join("")}</TableCell>
                  <TableCell align="center">L{index + 1}-N</TableCell>
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
