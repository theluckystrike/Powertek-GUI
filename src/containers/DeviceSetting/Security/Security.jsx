import React, { useState } from "react";
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
} from "@mui/material";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import SaveIcon from "@mui/icons-material/Save";
import MuiButton from "../../../components/common/styled/Button";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
}));

function IpAccessControl4() {
  const [ipv4Enabled, setIpv4Enabled] = useState(false);
  const [inboundRules, setInboundRules] = useState([]);
  const [outboundRules, setOutboundRules] = useState([]);

  const handleIpv4Change = (event) => {
    setIpv4Enabled(event.target.checked);
  };

  const handleAddInboundRule = () => {
    setInboundRules([...inboundRules, `Inbound Rule ${inboundRules.length + 1}`]);
  };

  const handleAddOutboundRule = () => {
    setOutboundRules([...outboundRules, `Outbound Rule ${outboundRules.length + 1}`]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic goes here
  };

  return (
    <Box elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <FormControlLabel
          control={<Switch checked={ipv4Enabled} onChange={handleIpv4Change} name="ipv4" />}
          label="Enable IPv4 access control"
        />

        {/* Inbound Rules Section */}
        <Box mt={4}>
          <Typography variant="h6">Inbound Rules</Typography>
          <Typography variant="subtitle1">Default policy: Accept</Typography>
          <List dense>
            {inboundRules.map((rule, index) => (
              <ListItem key={index} secondaryAction={<Button>Delete</Button>}>
                <ListItemText primary={rule} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={handleAddInboundRule}>
            Append
          </Button>
          {/* Insert Above button functionality to be implemented */}
        </Box>

        {/* Outbound Rules Section */}
        {/* <Box mt={4}>
          <Typography variant="h6">Outbound Rules</Typography>
          <Typography variant="subtitle1">Default policy: Accept</Typography>
          <List dense>
            {outboundRules.map((rule, index) => (
              <ListItem key={index} secondaryAction={<Button>Delete</Button>}>
                <ListItemText primary={rule} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={handleAddOutboundRule}>
            Append
          </Button>
        </Box> */}
        <Box mt={4}>
          <Button variant="contained" color="secondary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

function RoleACL({ title }) {
  const [enabled, setEnabled] = useState(false);
  const [rules, setRules] = useState([]);
  const [defaultPolicy, setDefaultPolicy] = useState("accept");

  const handleToggleChange = (event) => {
    setEnabled(event.target.checked);
  };

  const handleDefaultPolicyChange = (event) => {
    setDefaultPolicy(event.target.value);
  };

  const handleAddRule = () => {
    // Placeholder for adding rule logic
    const newRule = { startIP: "", endIP: "", role: "", policy: defaultPolicy };
    setRules([...rules, newRule]);
  };

  // The rest of the CRUD operations (insert, delete, edit) would need to be implemented here

  return (
    <Container component={Paper} elevation={3} sx={{ padding: "20px", margin: "20px 0" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">{title}</Typography>
        <FormControlLabel
          control={<Switch checked={enabled} onChange={handleToggleChange} />}
          label={`Enable role-based access control for ${title}`}
        />
      </Box>

      <Box mb={2}>
        <Select
          value={defaultPolicy}
          onChange={handleDefaultPolicyChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="accept">Accept</MenuItem>
          <MenuItem value="reject">Reject</MenuItem>
        </Select>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Start IP</StyledTableCell>
              <StyledTableCell>End IP</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Policy</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.length === 0 && (
              <TableRow>
                <StyledTableCell colSpan={5} align="center">
                  No rules defined
                </StyledTableCell>
              </TableRow>
            )}
            {rules.map((rule, index) => (
              <TableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{rule.startIP}</StyledTableCell>
                <StyledTableCell>{rule.endIP}</StyledTableCell>
                <StyledTableCell>{rule.role}</StyledTableCell>
                <StyledTableCell>{rule.policy}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleAddRule}>
          Append
        </Button>
        {/* Add "Insert Above" button functionality as needed */}
      </Box>
    </Container>
  );
}

function TLSCertificate() {
  const [certificate, setCertificate] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);

  const handleCertificateUpload = (event) => {
    setCertificate(event.target.files[0]);
  };

  const handlePrivateKeyUpload = (event) => {
    setPrivateKey(event.target.files[0]);
  };

  return (
    <Box elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Active TLS Certificate
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField fullWidth margin="normal" label="Common Name" variant="outlined" />
          <TextField fullWidth margin="normal" label="Device Certificate" variant="outlined" />
          <TextField fullWidth margin="normal" label="Country" variant="outlined" />
          <TextField fullWidth margin="normal" label="State or Province" variant="outlined" />
          <TextField fullWidth margin="normal" label="Locality" variant="outlined" />
          <TextField fullWidth margin="normal" label="Organization" variant="outlined" />
          <TextField fullWidth margin="normal" label="Organizational Unit" variant="outlined" />
          <TextField fullWidth margin="normal" label="Email Address" variant="outlined" />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => console.log("Create self-signed certificate")}>
          Create Self-Signed Certificate
        </Button>
        <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => console.log("Download CRS")}>
          Create certificate
        </Button>
        <label htmlFor="upload-certificate">
          <input
            style={{ display: "none" }}
            id="upload-certificate"
            type="file"
            accept=".crt"
            onChange={handleCertificateUpload}
          />
          <Button variant="outlined" component="span">
            Upload Certificate
          </Button>
        </label>
        {certificate && (
          <label htmlFor="upload-key">
            <input style={{ display: "none" }} id="upload-key" type="file" onChange={handlePrivateKeyUpload} />
            <Button variant="outlined" component="span">
              Upload Key
            </Button>
          </label>
        )}
        <Button variant="outlined" sx={{ ml: 1 }} onClick={() => console.log("Download Key & CRT")}>
          Download Key & CRT
        </Button>
      </Box>
    </Box>
  );
}

function Authentication() {
  const [authnticationType, setAuthnticationType] = React.useState("");

  const handleChange = (event) => {
    setAuthnticationType(event.target.value);
  };
  return (
    <Box elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={2}
          sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center", margin: "auto" }}
        >
          <Typography variant="h6" component="h2">
            Authentication
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Authntication Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={authnticationType}
              label="Authntication Type"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Local"}>Local</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="end" mt={2}>
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
      </Box>
    </Box>
  );
}

function Login() {
  return (
    <Box sx={{ width: "90%", display: "flex", margin: "auto", placeContent: "center" }}>
      <FormGroup sx={{ width: "100%", display: "flex", margin: "auto", placeContent: "center" }}>
        <h2>Login Settings</h2>
        <FormControlLabel control={<Checkbox />} label="Exclude ADMIN USER" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Block user on login failure" />
        <TextField label="Block timeout" defaultValue="10 min" margin="normal" fullWidth />
        <TextField label="Maximum number of failed logins" defaultValue="3" margin="normal" fullWidth />
        <TextField label="Timeout for failed login attempts" defaultValue="10 min" margin="normal" fullWidth />
        <h2>Login Limitations</h2>
        <FormControlLabel control={<Checkbox />} label="Exclude ADMIN USER" />
        <TextField label="Idle timeout period" defaultValue="1 d" margin="normal" fullWidth />
        <FormControlLabel control={<Checkbox />} label="Prevent concurrent login with same username" />
        <Box display="flex" justifyContent="end" mt={2}>
          <MuiButton variant="contained" color="primary">
            Save
          </MuiButton>
        </Box>
      </FormGroup>
    </Box>
  );
}

function PasswordPolicy() {
  return (
    <Box sx={{ width: "90%", display: "flex", margin: "auto", placeContent: "center" }}>
      <FormGroup sx={{ width: "100%", display: "flex", margin: "auto", placeContent: "center" }}>
        <h2>Password Policy</h2>

        <h3>Password Aging</h3>
        <FormControlLabel control={<Checkbox />} label="Exclude ADMIN USER" />
        <FormControlLabel control={<Checkbox />} label="Password aging" />
        <TextField label="Password aging interval" defaultValue="60 d" margin="normal" fullWidth />

        <h3>Strong Passwords</h3>
        <FormControlLabel control={<Checkbox />} label="Exclude ADMIN USER" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Strong passwords" />
        <TextField label="Minimum password length" defaultValue="8" margin="normal" fullWidth />
        <TextField label="Maximum password length" defaultValue="64" margin="normal" fullWidth />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Enforce at least one lower case character" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Enforce at least one upper case character" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Enforce at least one numeric character" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Enforce at least one special character" />
        <TextField label="Password history size" defaultValue="5" margin="normal" fullWidth />

        <Box display="flex" justifyContent="end" mt={2}>
          <MuiButton variant="contained" color="primary">
            Save
          </MuiButton>
        </Box>
      </FormGroup>
    </Box>
  );
}

function LDAP() {
  // Assuming there's a state to manage LDAP entries
  const [ldapEntries, setLdapEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const handleDeleteEntry = () => {
    setLdapEntries(ldapEntries.filter((entry) => entry !== selectedEntry));
    setSelectedEntry(null);
  };

  const handleTestConnection = () => {
    console.log("Testing connection for:", selectedEntry);
    // Placeholder for connection test logic
  };

  const handleSave = () => {
    console.log("Saving LDAP settings:", ldapEntries);
    // Placeholder for save logic
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
  }));

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Access Order</StyledTableCell>
            <StyledTableCell>IP Address / Hostname</StyledTableCell>
            <StyledTableCell>Security</StyledTableCell>
            <StyledTableCell>Port</StyledTableCell>
            <StyledTableCell>LDAP Server Type</StyledTableCell>
            <StyledTableCell>Users OU</StyledTableCell>
            <StyledTableCell>Groups OU</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ldapEntries.map((entry, index) => (
            <TableRow
              key={index}
              onClick={() => handleSelectEntry(entry)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                <TextField defaultValue={entry.order} label="Order" variant="outlined" size="small" />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  defaultValue={entry.ip}
                  fullWidth
                  label="IP Address / Hostname"
                  variant="outlined"
                  size="small"
                />
              </StyledTableCell>
              <StyledTableCell>
                <Select defaultValue={entry.security} label="Security" onChange={() => {}} size="small">
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="SSL">SSL</MenuItem>
                </Select>
              </StyledTableCell>
              <StyledTableCell>
                <TextField defaultValue={entry.port} label="Port" variant="outlined" size="small" />
              </StyledTableCell>
              <StyledTableCell>
                <Select defaultValue={entry.type} label="LDAP Server Type" onChange={() => {}} size="small">
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Secondary">Secondary</MenuItem>
                </Select>
              </StyledTableCell>
              <StyledTableCell>
                <TextField defaultValue={entry.usersOU} fullWidth label="Users OU" variant="outlined" size="small" />
              </StyledTableCell>
              <StyledTableCell>
                <TextField defaultValue={entry.groupsOU} fullWidth label="Groups OU" variant="outlined" size="small" />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <div>
          <Button
            variant="contained"
            onClick={() =>
              setLdapEntries([
                ...ldapEntries,
                { order: ldapEntries.length + 1, ip: "", port: "", security: "", type: "", usersOU: "", groupsOU: "" },
              ])
            }
          >
            New
          </Button>
          <Button variant="contained" color="primary" onClick={() => console.log("Edit")}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteEntry}>
            Delete
          </Button>
          <Button variant="contained" color="warning" onClick={handleTestConnection}>
            Test Connection
          </Button>
        </div>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </TableContainer>
  );
}

function Radius() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Access Order</StyledTableCell>
            <StyledTableCell>IP Address / Hostname</StyledTableCell>
            <StyledTableCell>Authentication Port</StyledTableCell>
            <StyledTableCell>Accounting Port</StyledTableCell>
            <StyledTableCell>Server Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {/* Replace these TextFields with your form controls as necessary */}
            <StyledTableCell component="th" scope="row">
              <TextField label="Order" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <TextField fullWidth label="IP Address / Hostname" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <TextField label="Auth Port" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <TextField label="Port" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <Select label="LDAP Server Type" value="" onChange={() => {}} size="small">
                <MenuItem value={10}>Primary</MenuItem>
                <MenuItem value={20}>Secondary</MenuItem>
              </Select>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <div>
          <Button style={{ marginRight: "4px" }} variant="contained">
            New
          </Button>
          <Button style={{ marginRight: "4px" }} variant="contained" color="primary">
            Edit
          </Button>
          <Button style={{ marginRight: "4px" }} variant="contained" color="secondary">
            Delete
          </Button>
          <Button style={{ marginRight: "4px" }} variant="contained" color="warning">
            Test Connection
          </Button>
        </div>
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
      </div>
    </TableContainer>
  );
}

function TACACS() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Access Order</StyledTableCell>
            <StyledTableCell>IP Address / Hostname</StyledTableCell>
            <StyledTableCell>Authentication Port</StyledTableCell>
            <StyledTableCell>Accounting Port</StyledTableCell>
            <StyledTableCell>Server Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {/* Replace these TextFields with your form controls as necessary */}
            <StyledTableCell component="th" scope="row">
              <TextField label="Order" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <TextField fullWidth label="IP Address / Hostname" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <TextField label="Auth Port" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <TextField label="Port" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <Select label="LDAP Server Type" value="" onChange={() => {}} size="small">
                <MenuItem value={10}>Primary</MenuItem>
                <MenuItem value={20}>Secondary</MenuItem>
              </Select>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <div>
          <Button style={{ marginRight: "4px" }} variant="contained">
            New
          </Button>
          <Button style={{ marginRight: "4px" }} variant="contained" color="primary">
            Edit
          </Button>
          <Button style={{ marginRight: "4px" }} variant="contained" color="secondary">
            Delete
          </Button>
          <Button style={{ marginRight: "4px" }} variant="contained" color="warning">
            Test Connection
          </Button>
        </div>
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
      </div>
    </TableContainer>
  );
}

function ManagePDUs() {
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

function Security() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Security">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="IP Access Control">
                  <CollapsiableNamedContainer title="IPv4">
                    <IpAccessControl4 />
                  </CollapsiableNamedContainer>
                  <CollapsiableNamedContainer title="IPv6">
                    <IpAccessControl4 />
                  </CollapsiableNamedContainer>
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Role Based Access Control">
                  <CollapsiableNamedContainer title="IPv4">
                    <RoleACL title={"IPv4"} />
                  </CollapsiableNamedContainer>
                  <CollapsiableNamedContainer title="IPv6">
                    <RoleACL title={"IPv6"} />
                  </CollapsiableNamedContainer>
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="TLS Certificate">
                  <TLSCertificate />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Authentication">
                  <Authentication />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="LDAP / Active Directory">
                  <LDAP />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Radius">
                  <Radius />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="TACACS+">
                  <TACACS />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Login">
                  <Login />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Password Policy">
                  <PasswordPolicy />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Manage PDU">
                  <ManagePDUs />
                </CollapsiableNamedContainer>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Security;
