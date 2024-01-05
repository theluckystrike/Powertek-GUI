import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import SaveIcon from "@mui/icons-material/Save";

function NetworkSettingsForm() {
  const ipv4Routes = [];
  const ipv6Routes = [];

  return (
    <Box p={3}>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="cascading-mode-label">Cascading mode</InputLabel>
          <Select labelId="cascading-mode-label" id="cascading-mode" label="Cascading mode">
            <MenuItem value="bridging">Bridging</MenuItem>
            {/* Add other options here */}
          </Select>
        </FormControl>
        <TextField fullWidth label="DNS resolver preference" variant="outlined" margin="normal" />
        <TextField fullWidth label="DNS suffixes (optional)" variant="outlined" margin="normal" />
        <TextField fullWidth label="First DNS server" variant="outlined" margin="normal" defaultValue="8.8.8.8" />
        <TextField fullWidth label="Second DNS server" variant="outlined" margin="normal" />
        <TextField fullWidth label="Third DNS server" variant="outlined" margin="normal" />
      </Box>
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
        IPv4 routes
      </Typography>
      {ipv4Routes.length > 0 ? (
        ipv4Routes.map((route, index) => (
          <Box key={index} display="flex" justifyContent="space-between" alignItems="center" my={1}>
            <Typography>Destination: {route.destination}</Typography>
            <Typography>Next Hop: {route.nextHop}</Typography>
          </Box>
        ))
      ) : (
        <Typography>No IPv4 routes defined</Typography>
      )}
      <Button variant="contained" sx={{ my: 2 }}>
        Add IPv4 Route
      </Button>

      <Typography variant="subtitle1" gutterBottom>
        IPv6 routes
      </Typography>
      {ipv6Routes.length > 0 ? (
        ipv6Routes.map((route, index) => (
          <Box key={index} display="flex" justifyContent="space-between" alignItems="center" my={1}>
            <Typography>Destination: {route.destination}</Typography>
            <Typography>Next Hop: {route.nextHop}</Typography>
          </Box>
        ))
      ) : (
        <Typography>No IPv6 routes defined</Typography>
      )}
      <Button variant="contained" sx={{ my: 2 }}>
        Add IPv6 Route
      </Button>
    </Box>
  );
}

function IPConfiguration() {
  const [ipv4Enabled, setIpv4Enabled] = useState(true);
  const [ipv6Enabled, setIpv6Enabled] = useState(false);
  const [ipv4Configuration, setIpv4Configuration] = useState("static");
  const [ipv6Configuration, setIpv6Configuration] = useState("automatic");
  // Additional state variables for IP, subnet mask, gateway, etc., would be added here

  return (
    <Box p={3}>
      {/* IPv4 Configuration */}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={ipv4Enabled} onChange={(e) => setIpv4Enabled(e.target.checked)} />}
          label="Enable IPv4"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>IP auto configuration</InputLabel>
          <Select
            value={ipv4Configuration}
            onChange={(e) => setIpv4Configuration(e.target.value)}
            label="IP auto configuration"
          >
            <MenuItem value="static">Static</MenuItem>
            <MenuItem value="dhcp">DHCP</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="IP address/prefix length"
          value="192.168.33.130/24"
          // onChange handler would update state here
        />
        <TextField
          fullWidth
          margin="normal"
          label="Default gateway"
          value="192.168.33.126"
          // onChange handler would update state here
        />
      </FormGroup>

      {/* IPv6 Configuration */}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={ipv6Enabled} onChange={(e) => setIpv6Enabled(e.target.checked)} />}
          label="Enable IPv6"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>IP auto configuration</InputLabel>
          <Select
            value={ipv6Configuration}
            onChange={(e) => setIpv6Configuration(e.target.value)}
            label="IP auto configuration"
          >
            <MenuItem value="automatic">Automatic</MenuItem>
            <MenuItem value="manual">Manual</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Preferred hostname"
          // value would be bound to state
          // onChange handler would update state here
        />
      </FormGroup>
    </Box>
  );
}

function InterfaceSettings() {
  const [interfaceEnabled, setInterfaceEnabled] = useState(true);
  const [speed, setSpeed] = useState("auto");
  const [duplex, setDuplex] = useState("auto");
  const [mtu, setMtu] = useState("1500");
  const [enableLLDP, setEnableLLDP] = useState(false);
  const [authentication, setAuthentication] = useState("no_auth");

  return (
    <Box p={3}>
      {/* Enable Interface */}
      <FormControlLabel
        control={<Checkbox checked={interfaceEnabled} onChange={(e) => setInterfaceEnabled(e.target.checked)} />}
        label="Enable interface"
      />

      {/* Interface Settings */}
      <FormGroup>
        {/* Speed Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Speed</InputLabel>
          <Select value={speed} onChange={(e) => setSpeed(e.target.value)} label="Speed">
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="10MB/s">10 MB/s</MenuItem>
            <MenuItem value="100MB/s">100 MB/s</MenuItem>
            <MenuItem value="1GB/s">1 GB/s</MenuItem>
          </Select>
        </FormControl>

        {/* Duplex Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Duplex</InputLabel>
          <Select value={duplex} onChange={(e) => setDuplex(e.target.value)} label="Duplex">
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="half">Half</MenuItem>
            <MenuItem value="full">Full</MenuItem>
          </Select>
        </FormControl>

        {/* Current State Display */}
        <TextField
          fullWidth
          margin="normal"
          label="Current state"
          value="100 MBi/s, full duplex, link OK, autonegotiation on"
          InputProps={{
            readOnly: true,
          }}
        />

        {/* MTU Input */}
        <TextField fullWidth margin="normal" label="MTU" value={mtu} onChange={(e) => setMtu(e.target.value)} />

        {/* Enable LLDP */}
        <FormControlLabel
          control={<Checkbox checked={enableLLDP} onChange={(e) => setEnableLLDP(e.target.checked)} />}
          label="Enable LLDP"
        />

        {/* Authentication Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Authentication</InputLabel>
          <Select value={authentication} onChange={(e) => setAuthentication(e.target.value)} label="Authentication">
            <MenuItem value="no_auth">No Authentication</MenuItem>
            <MenuItem value="auth">Authentication</MenuItem>
          </Select>
        </FormControl>

        {/* Optional: Button to show EAP Authentication Log */}
        <Button variant="outlined" style={{ marginTop: 16 }}>
          Show EAP Authentication Log
        </Button>
      </FormGroup>
    </Box>
  );
}

function Wireless() {
  const [interfaceEnabled, setInterfaceEnabled] = useState(false);

  return (
    <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} p={3}>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={interfaceEnabled}
              onChange={(e) => setInterfaceEnabled(e.target.checked)}
              color="primary"
            />
          }
          label="Enable interface"
        />
        <Typography variant="body1">Hardware state</Typography>
        <Typography variant="body2" color="textSecondary">
          not detected
        </Typography>
      </div>

      <div style={{ textAlign: "right" }}>
        <Typography variant="body1" color="error">
          Interface cannot be enabled with selected cascading mode
        </Typography>
        <Button variant="text" color="primary">
          Show WLAN Diagnostic Log
        </Button>
      </div>

      <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ marginLeft: 16 }}>
        Save
      </Button>
    </Box>
  );
}

function Network() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Network">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Common Network Settings">
                  <NetworkSettingsForm />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Bridge">
                  <IPConfiguration />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="ETH1">
                  <InterfaceSettings />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="ETH2">
                  <InterfaceSettings />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Wireless">
                  <Wireless />
                </CollapsiableNamedContainer>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Network;
