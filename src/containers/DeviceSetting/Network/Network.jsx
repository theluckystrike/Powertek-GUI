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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import MuiButton from "../../../components/common/styled/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
      <Box display="flex" justifyContent="end">
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
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
      <Box display="flex" justifyContent="end">
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
      </Box>
    </Box>
  );
}

function IPv4() {
  const [ipv4Enabled, setIpv4Enabled] = useState(true);
  const [ipv4Configuration, setIpv4Configuration] = useState("static");
  const [ipAddress, setIpAddress] = useState("192.168.33.130/24");
  const [defaultGateway, setDefaultGateway] = useState("192.168.33.126");
  const [dns1, setDns1] = useState("");
  const [dns2, setDns2] = useState("");
  const [dns3, setDns3] = useState("");
  const [routes, setRoutes] = useState([
    { id: 1, network: "192.168.1.0", mask: "255.255.255.0", metric: 1, nextHop: "192.168.0.15" },
  ]);

  const handleAddRoute = () => {
    const newRoute = { id: Date.now(), network: "", mask: "", metric: 0, nextHop: "" };
    setRoutes([...routes, newRoute]);
  };

  const handleRouteChange = (id, field, value) => {
    const newRoutes = routes.map((route) => {
      if (route.id === id) {
        return { ...route, [field]: value };
      }
      return route;
    });
    setRoutes(newRoutes);
  };

  const handleRemoveRoute = (id) => {
    setRoutes(routes.filter((route) => route.id !== id));
  };

  return (
    <Box p={3}>
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
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Default gateway"
          value={defaultGateway}
          onChange={(e) => setDefaultGateway(e.target.value)}
        />
        <TextField fullWidth margin="normal" label="DNS 1" value={dns1} onChange={(e) => setDns1(e.target.value)} />
        <TextField fullWidth margin="normal" label="DNS 2" value={dns2} onChange={(e) => setDns2(e.target.value)} />
        <TextField fullWidth margin="normal" label="DNS 3" value={dns3} onChange={(e) => setDns3(e.target.value)} />
      </FormGroup>

      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Network</TableCell>
              <TableCell>Mask</TableCell>
              <TableCell>Metric</TableCell>
              <TableCell>Next Hop IP</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route, index) => (
              <TableRow key={route.id}>
                <TableCell>
                  <TextField
                    value={route.network}
                    onChange={(e) => handleRouteChange(route.id, "network", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField value={route.mask} onChange={(e) => handleRouteChange(route.id, "mask", e.target.value)} />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={route.metric}
                    onChange={(e) => handleRouteChange(route.id, "metric", parseInt(e.target.value, 10))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={route.nextHop}
                    onChange={(e) => handleRouteChange(route.id, "nextHop", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveRoute(route.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <MuiButton variant="contained" color="primary" onClick={handleAddRoute}>
          Add Route
        </MuiButton>
      </Box>

      <Box display="flex" justifyContent="end">
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
      </Box>
    </Box>
  );
}

function IPv6() {
  const [ipv4Enabled, setIpv4Enabled] = useState(true);
  const [ipv4Configuration, setIpv4Configuration] = useState("static");
  const [ipAddress, setIpAddress] = useState("192.168.33.130/24");
  const [defaultGateway, setDefaultGateway] = useState("192.168.33.126");
  const [dns1, setDns1] = useState("");
  const [dns2, setDns2] = useState("");
  const [dns3, setDns3] = useState("");
  const [routes, setRoutes] = useState([
    { id: 1, network: "192.168.1.0", prefix: "62", metric: 1, nextHop: "192.168.0.15" },
  ]);

  const handleAddRoute = () => {
    const newRoute = { id: Date.now(), network: "", prefix: "62", metric: 0, nextHop: "" };
    setRoutes([...routes, newRoute]);
  };

  const handleRouteChange = (id, field, value) => {
    const newRoutes = routes.map((route) => {
      if (route.id === id) {
        return { ...route, [field]: value };
      }
      return route;
    });
    setRoutes(newRoutes);
  };

  const handleRemoveRoute = (id) => {
    setRoutes(routes.filter((route) => route.id !== id));
  };

  return (
    <Box p={3}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={ipv4Enabled} onChange={(e) => setIpv4Enabled(e.target.checked)} />}
          label="Enable IPv6"
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
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Default gateway"
          value={defaultGateway}
          onChange={(e) => setDefaultGateway(e.target.value)}
        />
        <TextField fullWidth margin="normal" label="DNS 1" value={dns1} onChange={(e) => setDns1(e.target.value)} />
        <TextField fullWidth margin="normal" label="DNS 2" value={dns2} onChange={(e) => setDns2(e.target.value)} />
        <TextField fullWidth margin="normal" label="DNS 3" value={dns3} onChange={(e) => setDns3(e.target.value)} />
      </FormGroup>

      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Network</TableCell>
              <TableCell>Prefix</TableCell>
              <TableCell>Metric</TableCell>
              <TableCell>Next Hop IP</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route, index) => (
              <TableRow key={route.id}>
                <TableCell>
                  <TextField
                    value={route.network}
                    onChange={(e) => handleRouteChange(route.id, "network", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={route.prefix}
                    onChange={(e) => handleRouteChange(route.id, "prefix", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={route.metric}
                    onChange={(e) => handleRouteChange(route.id, "metric", parseInt(e.target.value, 10))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={route.nextHop}
                    onChange={(e) => handleRouteChange(route.id, "nextHop", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveRoute(route.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <MuiButton variant="contained" color="primary" onClick={handleAddRoute}>
          Add Route
        </MuiButton>
      </Box>

      <Box display="flex" justifyContent="end">
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
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
  const [userCertFile, setUserCertFile] = useState("");
  const [caCertFile, setCaCertFile] = useState("");
  const [privateKeyFile, setPrivateKeyFile] = useState("");

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    switch (fileType) {
      case "userCertificate":
        setUserCertFile(file);
        // Store user certificate file
        break;
      case "caCertificate":
        setCaCertFile(file);
        // Store CA certificate file
        break;
      case "privateKey":
        setPrivateKeyFile(file);
        // Store private key file
        break;
      default:
        break;
    }
  };

  // Based on your feedback, creating a dynamic list for authentication options
  const authenticationOptions = [
    { value: "no_auth", label: "No Authentication" },
    { value: "md5", label: "MD5" },
    { value: "tls", label: "TLS" },
    { value: "pwd", label: "PWD" },
    { value: "fast", label: "FAST" },
    { value: "peap", label: "PEAP" },
    { value: "tunneledTLS", label: "Tunneled TLS" },
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
          <InputLabel>Speed/Duplex</InputLabel>
          <Select value={speed} onChange={(e) => setSpeed(e.target.value)} label="Speed/Duplex">
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="10MB/s_half">10 MB/s Half-Duplex</MenuItem>
            <MenuItem value="10MB/s_full">10 MB/s Full-Duplex</MenuItem>
            <MenuItem value="100MB/s_half">100 MB/s Half-Duplex</MenuItem>
            <MenuItem value="100MB/s_full">100 MB/s Full-Duplex</MenuItem>
            <MenuItem value="1GB/s_full">1 GB/s Full-Duplex</MenuItem>
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
          <InputLabel>802.11X Authentication</InputLabel>
          <Select
            value={authentication}
            onChange={(e) => {
              setAuthentication(e.target.value);
              // Reset dependent states
              setAuthMethod("");
              setPeapVersion("");
              setInnerAuth("");
            }}
            label="802.11X Authentication"
          >
            {authenticationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(authentication === "pwd" || authentication === "md5") && (
          <>
            <TextField fullWidth margin="normal" label="Username" />
            <TextField fullWidth margin="normal" label="Password" type="password" />
          </>
        )}

        {/* Conditional rendering for PEAP and FAST specific configurations */}
        {authentication === "peap" && (
          <>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Anonymous Identity"
                variant="outlined"
                helperText="Enter the anonymous identity used in the initial phase of authentication."
              />
            </div>
            <div>
              <TextField
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="CA Certificate File"
                InputProps={{
                  inputProps: {
                    accept: ".crt,.pem",
                  },
                }}
                fullWidth
                margin="normal"
                helperText="Upload the CA certificate file for server validation."
                onChange={(e) => handleFileUpload(e, "caCertificate")}
              />
            </div>
            <div>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="inner-authentication-label">Inner Authentication</InputLabel>
                <Select
                  labelId="inner-authentication-label"
                  id="inner-authentication-select"
                  label="Inner Authentication"
                >
                  <MenuItem value="MSCHAPv2">MSCHAPv2</MenuItem>
                  <MenuItem value="MD5">MD5</MenuItem>
                  <MenuItem value="GTC">GTC</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="peap-version-label">PEAP Version</InputLabel>
                <Select labelId="peap-version-label" id="peap-version-select" label="PEAP Version">
                  <MenuItem value="auto">Automatic</MenuItem>
                  <MenuItem value="0">Version 0</MenuItem>
                  <MenuItem value="1">Version 1</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                helperText="Enter your username for network access authentication."
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                helperText="Enter your password for authentication."
              />
            </div>
          </>
        )}

        {authentication === "fast" && (
          <>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Anonymous Identity"
                variant="outlined"
                helperText="Provide the anonymous identity if required."
              />
            </div>
            <div>
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
            </div>
            <div>
              <TextField
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="PAC File"
                InputProps={{
                  inputProps: {
                    accept: ".pac",
                  },
                }}
                fullWidth
                margin="normal"
                helperText="Upload the PAC file for the network authentication."
                onChange={(e) => handleFileUpload(e, "pacFile")}
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                helperText="Enter your username for authentication."
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                helperText="Enter your password."
              />
            </div>
            <FormControlLabel control={<Checkbox />} label="Allow Automatic PAC Provisioning" />
            <div>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="pac-provisioning-label">Provisioning Mode</InputLabel>
                <Select labelId="pac-provisioning-label" id="pac-provisioning-select" label="Provisioning Mode">
                  <MenuItem value="anonymous">Anonymous</MenuItem>
                  <MenuItem value="authenticated">Authenticated</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              </FormControl>
            </div>
          </>
        )}

        {authentication === "tunneledTLS" && (
          <>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Anonymous Identity"
                variant="outlined"
                helperText="Enter the anonymous identity for initial client response."
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Domains"
                variant="outlined"
                helperText="Enter the domains for tunnel authentication. Separate multiple domains with commas."
              />
            </div>
            <div>
              <TextField
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="CA Certificate File"
                InputProps={{
                  inputProps: {
                    accept: ".crt,.pem",
                  },
                }}
                fullWidth
                margin="normal"
                helperText="Upload the CA certificate file required for TLS."
                onChange={(e) => handleFileUpload(e, "caCertificate")}
              />
            </div>
            <div>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="inner-authentication-label">Inner Authentication</InputLabel>
                <Select
                  labelId="inner-authentication-label"
                  id="inner-authentication-select"
                  label="Inner Authentication"
                >
                  <MenuItem value="PAP">PAP</MenuItem>
                  <MenuItem value="MSCHAP">MSCHAP</MenuItem>
                  <MenuItem value="MSCHAPv2">MSCHAPv2</MenuItem>
                  <MenuItem value="MSCHAPv2-noPEAP">MSCHAPv2 (No PEAP)</MenuItem>
                  <MenuItem value="CHAP">CHAP</MenuItem>
                  <MenuItem value="MD5">MD5</MenuItem>
                  <MenuItem value="GTC">GTC</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                helperText="Enter your username for authentication."
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                helperText="Enter your password."
              />
            </div>
          </>
        )}

        {authentication === "tls" && (
          <>
            <div>
              <TextField
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="User Certificate"
                InputProps={{
                  inputProps: {
                    accept: ".pem,.crt",
                  },
                }}
                onChange={(e) => handleFileUpload(e, "userCertificate")}
                fullWidth
                margin="normal"
              />
              {userCertFile && (
                <Typography variant="body2" color="textSecondary">
                  {userCertFile.name}
                </Typography>
              )}
            </div>
            <div>
              <TextField
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="CA Certificate"
                InputProps={{
                  inputProps: {
                    accept: ".pem,.crt",
                  },
                }}
                onChange={(e) => handleFileUpload(e, "caCertificate")}
                fullWidth
                margin="normal"
              />
              {caCertFile && (
                <Typography variant="body2" color="textSecondary">
                  {caCertFile.name}
                </Typography>
              )}
            </div>
            <FormControlLabel control={<Checkbox />} label="No CA certificate required" />
            <div>
              <TextField
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="Private Key"
                InputProps={{
                  inputProps: {
                    accept: ".key",
                  },
                }}
                onChange={(e) => handleFileUpload(e, "privateKey")}
                fullWidth
                margin="normal"
              />
              {privateKeyFile && (
                <Typography variant="body2" color="textSecondary">
                  {privateKeyFile.name}
                </Typography>
              )}
            </div>
            <TextField fullWidth margin="normal" label="Private Key Password" type="password" variant="outlined" />
          </>
        )}

        {/* Save button */}
        <Box display="flex" justifyContent="end">
          <MuiButton variant="contained" color="primary">
            Save
          </MuiButton>
        </Box>
      </FormGroup>
    </Box>
  );
}

function Wireless() {
  const [interfaceEnabled, setInterfaceEnabled] = useState(false);

  return (
    <>
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
      </Box>
      <Box display="flex" justifyContent="end">
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
      </Box>
    </>
  );
}

function Network() {
  const [networkMode, setNetworkMode] = useState("Independent");

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
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
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="IPv4">
                  <IPv4 />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="IPv6">
                  <IPv6 />
                </CollapsiableNamedContainer>
              </Grid>
              {/* Always show common network settings */}
              {/* <Grid item xs={12}>
                <CollapsiableNamedContainer title="Common Network Settings">
                  <NetworkSettingsForm />
                </CollapsiableNamedContainer>
              </Grid> */}
              {/* Conditionally render parts of the UI based on the selected mode */}
              {/* <Grid item xs={12}>
                <CollapsiableNamedContainer title="Bridge">
                  <IPConfiguration />
                </CollapsiableNamedContainer>
              </Grid> */}
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
