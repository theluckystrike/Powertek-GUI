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
} from "@mui/material";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import SaveIcon from "@mui/icons-material/Save";

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
        <Box mt={4}>
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
          {/* Insert Above button functionality to be implemented */}
        </Box>
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
              <TableCell>#</TableCell>
              <TableCell>Start IP</TableCell>
              <TableCell>End IP</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Policy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No rules defined
                </TableCell>
              </TableRow>
            )}
            {rules.map((rule, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{rule.startIP}</TableCell>
                <TableCell>{rule.endIP}</TableCell>
                <TableCell>{rule.role}</TableCell>
                <TableCell>{rule.policy}</TableCell>
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

function Security() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
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
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Security;
