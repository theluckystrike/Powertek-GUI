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
        {/* <Grid item xs={12} md={6}>
          <TextField fullWidth margin="normal" label="Issuer Country" variant="outlined" />
          <TextField fullWidth margin="normal" label="Issuer State or Province" variant="outlined" />
          <TextField fullWidth margin="normal" label="Issuer Locality" variant="outlined" />
          <TextField fullWidth margin="normal" label="Issuer Organization" variant="outlined" />
          <TextField fullWidth margin="normal" label="Issuer Organizational Unit" variant="outlined" />
          <TextField fullWidth margin="normal" label="Issuer Common Name" variant="outlined" />
          <TextField fullWidth margin="normal" label="Issuer Email Address" variant="outlined" />
        </Grid> */}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Download Key
        </Button>
        <Button variant="outlined" color="primary">
          Download Certificate
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
              <Select label="Security" value="" onChange={() => { }} size="small">
                <MenuItem value={10}>Option 1</MenuItem>
                <MenuItem value={20}>Option 2</MenuItem>
              </Select>
            </StyledTableCell>
            <StyledTableCell>
              <TextField label="Port" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell>
              <Select label="LDAP Server Type" value="" onChange={() => { }} size="small">
                <MenuItem value={10}>Primary</MenuItem>
                <MenuItem value={20}>Secondary</MenuItem>
              </Select>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <div>
          <Button style={{ marginRight: "4px" }} variant="contained">New</Button>
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
              <Select label="LDAP Server Type" value="" onChange={() => { }} size="small">
                <MenuItem value={10}>Primary</MenuItem>
                <MenuItem value={20}>Secondary</MenuItem>
              </Select>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <div>
          <Button style={{ marginRight: "4px" }} variant="contained">New</Button>
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
              <Select label="LDAP Server Type" value="" onChange={() => { }} size="small">
                <MenuItem value={10}>Primary</MenuItem>
                <MenuItem value={20}>Secondary</MenuItem>
              </Select>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <div>
          <Button style={{ marginRight: "4px" }} variant="contained">New</Button>
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
                <CollapsiableNamedContainer title="LDAP">
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
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Security;
