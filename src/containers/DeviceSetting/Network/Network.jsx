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
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="primary">
          Save Settings
        </Button>
      </Box>
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
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="primary">
          Save Settings
        </Button>
      </Box>
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
  const [authMethod, setAuthMethod] = useState("");
  const [peapVersion, setPeapVersion] = useState("");
  const [innerAuth, setInnerAuth] = useState("");

  // Based on your feedback, creating a dynamic list for authentication options
  const authenticationOptions = [
    { value: "no_auth", label: "No Authentication" },
    { value: "md5", label: "MD5" },
    { value: "tls", label: "TLS" },
    { value: "pwd", label: "PWD" },
    { value: "fast", label: "FAST" },
    { value: "peap", label: "PEAP" },
  ];

  // Inner authentication options for PEAP and FAST
  const innerAuthOptions = {
    peap: [
      { value: "mschapv2", label: "MSCHAPv2" },
      { value: "gtc", label: "GTC" },
      { value: "md5", label: "MD5" },
    ],
    fast: [
      { value: "gtc", label: "GTC" },
      { value: "mschapv2", label: "MSCHAPv2" },
    ],
  };

  return (
    <Box p={3}>
      <FormGroup>
        {/* Interface enable/disable */}
        <FormControlLabel
          control={<Checkbox checked={interfaceEnabled} onChange={(e) => setInterfaceEnabled(e.target.checked)} />}
          label="Enable interface"
        />

        {/* Speed selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Speed</InputLabel>
          <Select value={speed} onChange={(e) => setSpeed(e.target.value)} label="Speed">
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="10MB/s_half">10 MB/s Half-Duplex</MenuItem>
            <MenuItem value="10MB/s_full">10 MB/s Full-Duplex</MenuItem>
            <MenuItem value="100MB/s_half">100 MB/s Half-Duplex</MenuItem>
            <MenuItem value="100MB/s_full">100 MB/s Full-Duplex</MenuItem>
            <MenuItem value="1GB/s_full">1 GB/s Full-Duplex</MenuItem>
          </Select>
        </FormControl>

        {/* Duplex selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Duplex</InputLabel>
          <Select value={duplex} onChange={(e) => setDuplex(e.target.value)} label="Duplex">
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="half">Half</MenuItem>
            <MenuItem value="full">Full</MenuItem>
          </Select>
        </FormControl>

        {/* MTU configuration */}
        <TextField fullWidth margin="normal" label="MTU" value={mtu} onChange={(e) => setMtu(e.target.value)} />

        {/* LLDP enable/disable */}
        <FormControlLabel
          control={<Checkbox checked={enableLLDP} onChange={(e) => setEnableLLDP(e.target.checked)} />}
          label="Enable LLDP"
        />

        {/* Authentication method selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Authentication</InputLabel>
          <Select
            value={authentication}
            onChange={(e) => {
              setAuthentication(e.target.value);
              // Reset dependent states
              setAuthMethod("");
              setPeapVersion("");
              setInnerAuth("");
            }}
            label="Authentication"
          >
            {authenticationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {authentication === "pwd" && (
          <>
            <TextField fullWidth margin="normal" label="Username" />
            <TextField fullWidth margin="normal" label="Password" type="password" />
          </>
        )}

        {/* Conditional rendering for PEAP and FAST specific configurations */}
        {authentication === "peap" && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>PEAP Version</InputLabel>
              <Select value={peapVersion} onChange={(e) => setPeapVersion(e.target.value)} label="PEAP Version">
                <MenuItem value="auto">Automatic</MenuItem>
                <MenuItem value="0">Version 0</MenuItem>
                <MenuItem value="1">Version 1</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Inner Authentication</InputLabel>
              <Select value={innerAuth} onChange={(e) => setInnerAuth(e.target.value)} label="Inner Authentication">
                {innerAuthOptions["peap"].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {authentication === "fast" && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Inner Authentication</InputLabel>
            <Select value={innerAuth} onChange={(e) => setInnerAuth(e.target.value)} label="Inner Authentication">
              {innerAuthOptions["fast"].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Save button */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary">
            Save Settings
          </Button>
        </Box>
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
  const [networkMode, setNetworkMode] = useState("Independent");

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Network">
            {/* Dropdown for selecting network mode */}
            <FormControl fullWidth>
              <InputLabel id="network-mode-select-label">Network Mode</InputLabel>
              <Select
                labelId="network-mode-select-label"
                id="network-mode-select"
                value={networkMode}
                label="Network Mode"
                onChange={(e) => setNetworkMode(e.target.value)}
                sx={{ marginBottom: "20px" }}
              >
                <MenuItem value="Independent">Independent</MenuItem>
                <MenuItem value="VRF">VRF</MenuItem>
                <MenuItem value="Link-Local">Link-Local</MenuItem>
              </Select>
            </FormControl>

            <Grid container rowSpacing={2}>
              {/* Always show common network settings */}
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Common Network Settings">
                  <NetworkSettingsForm />
                </CollapsiableNamedContainer>
              </Grid>
              {/* Conditionally render parts of the UI based on the selected mode */}
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Bridge">
                  <IPConfiguration />
                </CollapsiableNamedContainer>
              </Grid>
              {(networkMode === "VRF" || networkMode === "Independent") && (
                <>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="ETH1">
                      <InterfaceSettings />
                    </CollapsiableNamedContainer>
                  </Grid>
                  {networkMode !== "Link-Local" && (
                    <Grid item xs={12}>
                      <CollapsiableNamedContainer title="ETH2">
                        <InterfaceSettings />
                      </CollapsiableNamedContainer>
                    </Grid>
                  )}
                </>
              )}
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
