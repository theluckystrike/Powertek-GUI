import React, { useState } from "react";
import NamedContainer, { CollapsiableNamedContainer } from "../../components/common/NamedContainer";
import {
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  FormGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import MuiButton from "../../components/common/styled/Button";

function ManagePDUComponenet() {
  const [pdus, setPdus] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addMethod, setAddMethod] = useState("manual"); // 'automatic' or 'manual'
  const [currentPdu, setCurrentPdu] = useState({
    name: "",
    model: "",
    sn: "",
    status: "Connect",
    user: "",
    password: "",
  });

  const handleOpenDialog = (
    pdu = { name: "", model: "", sn: "", status: "Connect", user: "", password: "" },
    edit = false
  ) => {
    setCurrentPdu(pdu);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setAddMethod("manual"); // Reset to default
  };

  const handleSavePdu = () => {
    if (currentPdu.sn) {
      // Assuming SN must be unique or a valid identifier
      const index = pdus.findIndex((p) => p.sn === currentPdu.sn);
      if (index >= 0) {
        pdus[index] = { ...currentPdu };
      } else {
        setPdus([...pdus, { ...currentPdu, status: "provisioning..." }]);
      }
    }
    handleCloseDialog();
  };

  const handleDeletePdu = (sn) => {
    setPdus(pdus.filter((pdu) => pdu.sn !== sn));
  };

  return (
    <>
      <Button variant="contained" onClick={() => handleOpenDialog()} color="primary" sx={{ marginBottom: "12px" }}>
        Add PDU
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>S/N</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pdus.map((pdu) => (
              <TableRow key={pdu.sn}>
                <TableCell>{pdu.name}</TableCell>
                <TableCell>{pdu.model}</TableCell>
                <TableCell>{pdu.sn}</TableCell>
                <TableCell>{pdu.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog(pdu, true)} color="primary">
                    Modify
                  </Button>
                  <Button onClick={() => handleDeletePdu(pdu.sn)} color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{currentPdu.sn ? "Modify PDU" : "Add PDU"}</DialogTitle>
        <DialogContent>
          {!currentPdu.sn && (
            <FormControl component="fieldset">
              <FormLabel component="legend">Add Method</FormLabel>
              <RadioGroup row name="addMethod" value={addMethod} onChange={(e) => setAddMethod(e.target.value)}>
                <FormControlLabel value="automatic" control={<Radio />} label="Automatic Discovery" />
                <FormControlLabel value="manual" control={<Radio />} label="Manual" />
              </RadioGroup>
            </FormControl>
          )}
          {addMethod === "manual" && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="IP or Serial Number"
                type="text"
                fullWidth
                value={currentPdu.sn}
                onChange={(e) => setCurrentPdu({ ...currentPdu, sn: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={currentPdu.name}
                onChange={(e) => setCurrentPdu({ ...currentPdu, name: e.target.value })}
              />
            </>
          )}
          {addMethod === "automatic" && (
            <>
              {/* Automatic discovery functionality to be implemented here */}
              {/* Placeholder for automatic discovery component or logic */}
              <div>Automatic Discovery Logic Placeholder</div>
              <div>SCANNING...</div>
            </>
          )}
          {currentPdu.sn && (
            <>
              <TextField
                margin="dense"
                label="Administrator Username"
                type="text"
                fullWidth
                value={currentPdu.user}
                onChange={(e) => setCurrentPdu({ ...currentPdu, user: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Administrator Password"
                type="password"
                fullWidth
                value={currentPdu.password}
                onChange={(e) => setCurrentPdu({ ...currentPdu, password: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePdu} color="primary">
            {currentPdu.sn ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="end" mt={2} sx={{ marginTop: "12px" }}>
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
      </Box>
    </>
  );
}

function ManagePDU() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Manage PDU">
            <ManagePDUComponenet />
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ManagePDU;
