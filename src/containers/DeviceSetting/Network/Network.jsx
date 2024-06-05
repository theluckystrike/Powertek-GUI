import React, { useState, useEffect } from "react";
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
import { Snackbar, Alert } from "@mui/material";
import MuiButton from "../../../components/common/styled/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Save } from "@mui/icons-material";

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
  // Additional state variables for IP, subnet netmask, gateway, etc., would be added here

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

function IPv4({ mode, eth, snackbar }) {
  const [ipv4Enabled, setIpv4Enabled] = useState(true);
  const [ipv4Configuration, setIpv4Configuration] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [netMask, setNetMask] = useState("");
  const [defaultGateway, setDefaultGateway] = useState("");
  const [dnsdhcp, setdnsdhcp] = useState(false);
  const [dns1, setDns1] = useState("");
  const [dns2, setDns2] = useState("");
  const [dns3, setDns3] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/devicesettings/network/ipv4")
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (mode === "vrf") {
          const eth_data = data[eth];
          setIpv4Enabled(eth_data?.ipv4enable);
          setIpv4Configuration(eth_data?.mode);
          setIpAddress(eth_data?.ipaddress === "None" ? "" : eth_data?.ipaddress);
          setDefaultGateway(eth_data?.gateway);
          setdnsdhcp(eth_data?.dnsdhcp);
          setNetMask(eth_data?.netmask === "None" ? "" : eth_data?.netmask);
          setDns1(eth_data?.dns1);
          setDns2(eth_data?.dns2);
          setDns3(eth_data?.dns3);
        } else {
          setIpv4Enabled(data?.ipv4enable);
          setIpv4Configuration(data?.mode);
          setIpAddress(data?.ipaddress === "None" ? "" : data?.ipaddress);
          setDefaultGateway(data?.gateway);
          setdnsdhcp(data?.dnsdhcp);
          setNetMask(data?.netmask === "None" ? "" : data?.netmask);
          setDns1(data?.dns1);
          setDns2(data?.dns2);
          setDns3(data?.dns3);
        }
      })
      .catch((error) => {
        console.error("Error fetching IPv4 settings:", error);
      });

    axios
      .get("/api/devicesettings/network/ipv4/route")
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (mode === "vrf") {
          const ethRoutes = data[eth] || [];
          setRoutes(ethRoutes.map((route, index) => ({ ...route, id: index + 1, edited: false })));
        } else {
          setRoutes(data.map((route, index) => ({ ...route, id: index + 1, edited: false })));
        }
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
      });
  }, [mode, eth]);

  const handleAddRoute = () => {
    const newRoute = { id: Date.now(), network: "", netmask: "", metric: 0, nexthop: "", edited: true, new: true };
    const newRoutes = [...routes, newRoute].sort((a, b) => a.metric - b.metric);
    setRoutes(newRoutes);
  };

  const handleRouteChange = (id, field, value) => {
    const newRoutes = routes.map((route) => {
      if (route.id === id) {
        if (value != route[field]) {
          return { ...route, [field]: value, edited: true };
        }
      }
      return route;
    });
    setRoutes(newRoutes);
  };

  const handleRemoveRoute = (id) => {
    const routeToRemove = routes.find((route) => route.id === id);

    if (!routeToRemove) return;

    if (
      routeToRemove.network == "" ||
      routeToRemove.nexthop == "" ||
      routeToRemove.metric == 0 ||
      routeToRemove.netmask == ""
    ) {
      setRoutes(routes.filter((route) => route.id !== id));
      return;
    }

    if (mode == "vrf") {
      axios
        .delete(`/api/devicesettings/network/ipv4/${eth}/route/${routeToRemove.metric}`)
        .then((response) => {
          console.log("Route deleted:", response.data);
          setRoutes(routes.filter((route) => route.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting route:", error);
        });
    } else {
      axios
        .delete(`/api/devicesettings/network/ipv4/route/${routeToRemove.metric}`)
        .then((response) => {
          console.log("Route deleted:", response.data);
          setRoutes(routes.filter((route) => route.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting route:", error);
        });
    }
  };

  const handleSave = () => {
    const payload = {
      ipv4enable: ipv4Enabled,
      mode: ipv4Configuration,
      ipaddress: ipAddress,
      netmask: netMask, // Assuming netmask is static, can be modified
      gateway: defaultGateway,
      dnsdhcp: dnsdhcp,
      dns1: dns1,
      dns2: dns2,
      dns3: dns3,
    };

    if (mode === "vrf") {
      axios
        .put(`/api/devicesettings/network/ipv4/${eth}`, payload)
        .then((response) => {
          console.log("IPv4 settings saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving IPv4 settings:", error);
        });
    } else {
      axios
        .put(`/api/devicesettings/network/ipv4/${eth}`, payload)
        .then((response) => {
          console.log("IPv4 settings saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving IPv4 settings:", error);
        });
    }
  };

  const handleRouteSave = (id) => {
    const routeToSave = routes.find((route) => route.id === id);
    if (!routeToSave) return;

    // Prepare the payload for the API request
    const payload = {
      network: routeToSave.network,
      netmask: routeToSave.netmask,
      nexthop: routeToSave.nexthop,
      metric: routeToSave.metric,
    };

    if (
      routeToSave.network == "" ||
      routeToSave.nexthop == "" ||
      routeToSave.metric == 0 ||
      routeToSave.netmask == ""
    ) {
      if (routeToSave.metric == 0) {
        snackbar.setSnackbarMessage("Metric cannot be zero (0)!");
      } else {
        snackbar.setSnackbarMessage("Network, Next Hop IP or Netmask cannot be empty!");
      }

      snackbar.setSnackbarSeverity("error");
      snackbar.setSnackbarOpen(true);
      // handleRemoveRoute(id);
      return;
    }

    const axiosMethod = routeToSave.new ? axios.post : axios.put;

    if (mode == "vrf") {
      const url = routeToSave.new
        ? `/api/devicesettings/network/ipv4/${eth}/route`
        : `/api/devicesettings/network/ipv4/${eth}/route/${routeToSave.metric}`;

      axiosMethod(url, payload)
        .then((response) => {
          console.log("Route saved:", response.data);

          // Update the route state to mark it as saved
          const newRoutes = routes.map((route) => {
            if (route.id === id) {
              return { ...route, edited: false, new: false };
            }
            return route;
          });
          setRoutes(newRoutes.sort((a, b) => a.metric - b.metric));
        })
        .catch((error) => {
          console.error("Error saving route:", error);
        });
    } else {
      const url = routeToSave.new
        ? `/api/devicesettings/network/ipv4/route`
        : `/api/devicesettings/network/ipv4/route/${routeToSave.metric}`;
      axiosMethod(url, payload)
        .then((response) => {
          console.log("Route saved:", response.data);

          // Update the route state to mark it as saved
          const newRoutes = routes.map((route) => {
            if (route.id === id) {
              return { ...route, edited: false };
            }
            return route;
          });
          setRoutes(newRoutes.sort((a, b) => a.metric - b.metric));
        })
        .catch((error) => {
          console.error("Error saving route:", error);
        });
    }
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
            onChange={(e) => {
              setIpv4Configuration(e.target.value);
            }}
            label="IP auto configuration"
            disabled={!ipv4Enabled} // Disable if IPv4 is disabled
          >
            <MenuItem value="static">Static</MenuItem>
            <MenuItem value="dhcp">DHCP</MenuItem>
          </Select>
        </FormControl>
        {ipv4Configuration === "static" ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="IP address"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              disabled={!ipv4Enabled} // Disable if IPv4 is disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Netmask"
              value={netMask}
              onChange={(e) => setNetMask(e.target.value)}
              disabled={!ipv4Enabled} // Disable if IPv4 is disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Default gateway"
              value={defaultGateway}
              onChange={(e) => setDefaultGateway(e.target.value)}
              disabled={!ipv4Enabled} // Disable if IPv4 is disabled
            />
          </>
        ) : null}
        {ipv4Configuration === "dhcp" ? (
          <FormControlLabel
            control={<Checkbox checked={dnsdhcp} onChange={(e) => setdnsdhcp(e.target.checked)} />}
            label="Allow Manual DNS"
          />
        ) : null}
        <TextField
          fullWidth
          margin="normal"
          label="DNS 1"
          value={dns1}
          onChange={(e) => setDns1(e.target.value)}
          disabled={!ipv4Enabled || (ipv4Configuration === "dhcp" && !dnsdhcp)} // Disable if IPv4 is disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="DNS 2"
          value={dns2}
          onChange={(e) => setDns2(e.target.value)}
          disabled={!ipv4Enabled || (ipv4Configuration === "dhcp" && !dnsdhcp)} // Disable if IPv4 is disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="DNS 3"
          value={dns3}
          onChange={(e) => setDns3(e.target.value)}
          disabled={!ipv4Enabled || (ipv4Configuration === "dhcp" && !dnsdhcp)} // Disable if IPv4 is disabled
        />
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
                    disabled={!ipv4Enabled}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={route.netmask}
                    onChange={(e) => handleRouteChange(route.id, "netmask", e.target.value)}
                    disabled={!ipv4Enabled}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={route.metric}
                    onChange={(e) => handleRouteChange(route.id, "metric", parseInt(e.target.value, 10))}
                    inputProps={{ readOnly: route.new ? false : true }}
                    disabled={!ipv4Enabled}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={route.nexthop}
                    onChange={(e) => handleRouteChange(route.id, "nexthop", e.target.value)}
                    disabled={!ipv4Enabled}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveRoute(route.id)}>
                    <DeleteIcon />
                  </IconButton>
                  {route.edited ? (
                    <IconButton onClick={() => handleRouteSave(route.id)}>
                      <Save />
                    </IconButton>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="end">
          <MuiButton
            variant="contained"
            color="primary"
            onClick={handleAddRoute}
            sx={{ marginTop: "12px", marginBottom: "12px" }}
          >
            Add Route
          </MuiButton>
        </Box>
      </Box>

      <Box display="flex" justifyContent="end">
        <MuiButton variant="contained" color="primary" onClick={handleSave}>
          Save
        </MuiButton>
      </Box>
    </Box>
  );
}

function IPv6({ mode, eth, snackbar }) {
  const [ipv6Enabled, setIpv6Enabled] = useState(true);
  const [ipv6Configuration, setIpv6Configuration] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [defaultGateway, setDefaultGateway] = useState("");
  const [dnsauto, setdnsauto] = useState(false);
  const [dns1, setDns1] = useState("");
  const [dns2, setDns2] = useState("");
  const [dns3, setDns3] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/devicesettings/network/ipv6")
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (mode === "vrf") {
          const eth_data = data[eth];
          setIpv6Enabled(eth_data?.ipv6enable);
          setIpv6Configuration(eth_data?.mode);
          setIpAddress(eth_data?.ipaddress === "None" ? "" : eth_data?.ipaddress);
          setDefaultGateway(eth_data?.gateway);
          setdnsauto(eth_data?.dnsauto);
          setDns1(eth_data?.dns1);
          setDns2(eth_data?.dns2);
          setDns3(eth_data?.dns3);
        } else {
          setIpv6Enabled(data?.ipv6enable);
          setIpv6Configuration(data?.mode);
          setIpAddress(data?.ipaddress === "None" ? "" : data?.ipaddress);
          setDefaultGateway(data?.gateway);
          setdnsauto(data?.dnsauto);
          setDns1(data?.dns1);
          setDns2(data?.dns2);
          setDns3(data?.dns3);
        }
      })
      .catch((error) => {
        console.error("Error fetching IPv4 settings:", error);
      });

    axios
      .get("/api/devicesettings/network/ipv6/route")
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (mode === "vrf") {
          const ethRoutes = data[eth] || [];
          setRoutes(ethRoutes.map((route, index) => ({ ...route, id: index + 1, edited: false })));
        } else {
          setRoutes(data.map((route, index) => ({ ...route, id: index + 1, edited: false })));
        }
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
      });
  }, [mode, eth]);

  const handleAddRoute = () => {
    const newRoute = { id: Date.now(), network: "", netmask: "", metric: 0, nexthop: "", edited: true, new: true };
    const newRoutes = [...routes, newRoute].sort((a, b) => a.metric - b.metric);
    setRoutes(newRoutes);
  };

  const handleRouteChange = (id, field, value) => {
    const newRoutes = routes.map((route) => {
      if (route.id === id) {
        if (value != route[field]) {
          return { ...route, [field]: value, edited: true };
        }
      }
      return route;
    });
    setRoutes(newRoutes);
  };

  const handleRemoveRoute = (id) => {
    const routeToRemove = routes.find((route) => route.id === id);

    if (!routeToRemove) return;

    if (routeToRemove.network == "" || routeToRemove.nexthop == "" || routeToRemove.metric == 0) {
      setRoutes(routes.filter((route) => route.id !== id));
      return;
    }

    if (mode == "vrf") {
      axios
        .delete(`/api/devicesettings/network/ipv6/${eth}/route/${routeToRemove.metric}`)
        .then((response) => {
          console.log("Route deleted:", response.data);
          setRoutes(routes.filter((route) => route.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting route:", error);
        });
    } else {
      axios
        .delete(`/api/devicesettings/network/ipv6/route/${routeToRemove.metric}`)
        .then((response) => {
          console.log("Route deleted:", response.data);
          setRoutes(routes.filter((route) => route.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting route:", error);
        });
    }
  };

  const handleSave = () => {
    const payload = {
      ipv6enable: ipv6Enabled,
      mode: ipv6Configuration,
      ipaddress: ipAddress,
      gateway: defaultGateway,
      dnsauto: dnsauto,
      dns1: dns1,
      dns2: dns2,
      dns3: dns3,
    };

    if (mode === "vrf") {
      axios
        .put(`/api/devicesettings/network/ipv6/${eth}`, payload)
        .then((response) => {
          console.log("IPv4 settings saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving IPv4 settings:", error);
        });
    } else {
      axios
        .put(`/api/devicesettings/network/ipv6/${eth}`, payload)
        .then((response) => {
          console.log("IPv4 settings saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving IPv4 settings:", error);
        });
    }
  };

  const handleRouteSave = (id) => {
    const routeToSave = routes.find((route) => route.id === id);
    if (!routeToSave) return;

    if (routeToSave.network == "" || routeToSave.nexthop == "" || routeToSave.metric == 0) {
      if (routeToSave.metric == 0) {
        snackbar.setSnackbarMessage("Metric cannot be zero (0)!");
      } else {
        snackbar.setSnackbarMessage("Network, Next Hop IP cannot be empty!");
      }
      snackbar.setSnackbarSeverity("error");
      snackbar.setSnackbarOpen(true);
      // handleRemoveRoute(id);
      return;
    }

    // Prepare the payload for the API request
    const payload = {
      network: routeToSave.network,
      nexthop: routeToSave.nexthop,
      metric: routeToSave.metric,
    };

    const axiosMethod = routeToSave.new ? axios.post : axios.put;

    if (mode == "vrf") {
      const url = routeToSave.new
        ? `/api/devicesettings/network/ipv6/${eth}/route`
        : `/api/devicesettings/network/ipv6/${eth}/route/${routeToSave.metric}`;

      axiosMethod(url, payload)
        .then((response) => {
          console.log("Route saved:", response.data);

          // Update the route state to mark it as saved
          const newRoutes = routes.map((route) => {
            if (route.id === id) {
              return { ...route, edited: false, new: false };
            }
            return route;
          });
          setRoutes(newRoutes.sort((a, b) => a.metric - b.metric));
        })
        .catch((error) => {
          console.error("Error saving route:", error);
        });
    } else {
      const url = routeToSave.new
        ? `/api/devicesettings/network/ipv6/route`
        : `/api/devicesettings/network/ipv6/route/${routeToSave.metric}`;
      axiosMethod(url, payload)
        .then((response) => {
          console.log("Route saved:", response.data);

          // Update the route state to mark it as saved
          const newRoutes = routes.map((route) => {
            if (route.id === id) {
              return { ...route, edited: false };
            }
            return route;
          });
          setRoutes(newRoutes.sort((a, b) => a.metric - b.metric));
        })
        .catch((error) => {
          console.error("Error saving route:", error);
        });
    }
  };

  return (
    <Box p={3}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={ipv6Enabled} onChange={(e) => setIpv6Enabled(e.target.checked)} />}
          label="Enable IPv6"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>IP auto configuration</InputLabel>
          <Select
            value={ipv6Configuration}
            onChange={(e) => {
              setIpv6Configuration(e.target.value);
            }}
            label="IP auto configuration"
            disabled={!ipv6Enabled} // Disable if IPv4 is disabled
          >
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="dhcp">DHCP</MenuItem>
            <MenuItem value="manual">Manual</MenuItem>
          </Select>
        </FormControl>
        {ipv6Configuration === "manual" ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="IP address/Prefix"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              disabled={!ipv6Enabled} // Disable if IPv4 is disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Default gateway"
              value={defaultGateway}
              onChange={(e) => setDefaultGateway(e.target.value)}
              disabled={!ipv6Enabled} // Disable if IPv4 is disabled
            />
          </>
        ) : null}
        {ipv6Configuration === "dhcp" || ipv6Configuration === "auto" ? (
          <FormControlLabel
            control={<Checkbox checked={dnsauto} onChange={(e) => setdnsauto(e.target.checked)} />}
            label="Allow Manual DNS"
          />
        ) : null}
        <TextField
          fullWidth
          margin="normal"
          label="DNS 1"
          value={dns1}
          onChange={(e) => setDns1(e.target.value)}
          disabled={!ipv6Enabled || ((ipv6Configuration === "dhcp" || ipv6Configuration === "auto") && !dnsauto)} // Disable if IPv4 is disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="DNS 2"
          value={dns2}
          onChange={(e) => setDns2(e.target.value)}
          disabled={!ipv6Enabled || ((ipv6Configuration === "dhcp" || ipv6Configuration === "auto") && !dnsauto)} // Disable if IPv4 is disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="DNS 3"
          value={dns3}
          onChange={(e) => setDns3(e.target.value)}
          disabled={!ipv6Enabled || ((ipv6Configuration === "dhcp" || ipv6Configuration === "auto") && !dnsauto)} // Disable if IPv4 is disabled
        />
      </FormGroup>

      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Network</TableCell>
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
                    disabled={!ipv6Enabled}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={route.metric}
                    onChange={(e) => handleRouteChange(route.id, "metric", parseInt(e.target.value, 10))}
                    inputProps={{ readOnly: route.new ? false : true }}
                    disabled={!ipv6Enabled}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={route.nexthop}
                    onChange={(e) => handleRouteChange(route.id, "nexthop", e.target.value)}
                    disabled={!ipv6Enabled}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveRoute(route.id)}>
                    <DeleteIcon />
                  </IconButton>
                  {route.edited ? (
                    <IconButton onClick={() => handleRouteSave(route.id)}>
                      <Save />
                    </IconButton>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="end">
          <MuiButton
            variant="contained"
            color="primary"
            onClick={handleAddRoute}
            sx={{ marginTop: "12px", marginBottom: "12px" }}
          >
            Add Route
          </MuiButton>
        </Box>
      </Box>

      <Box display="flex" justifyContent="end">
        <MuiButton variant="contained" color="primary" onClick={handleSave}>
          Save
        </MuiButton>
      </Box>
    </Box>
  );
}

function InterfaceSettings({ eth }) {
  const [interfaceEnabled, setInterfaceEnabled] = useState(true);
  const [speed, setSpeed] = useState("auto");
  const [mtu, setMtu] = useState("1500");
  const [enableLLDP, setEnableLLDP] = useState(false);
  const [authentication, setAuthentication] = useState("no_auth");
  const [authData, setAuthData] = useState({
    md5: {},
    tls: {},
    pwd: {},
    fast: {},
    peap: {},
    ttls: {},
  });
  const [userCertFile, setUserCertFile] = useState(null);
  const [caCertFile, setCaCertFile] = useState(null);
  const [privateKeyFile, setPrivateKeyFile] = useState(null);

  useEffect(() => {
    // Fetch data from API
    axios
      .get(`/api/devicesettings/network/${eth}`)
      .then((response) => {
        const data = response.data;
        setInterfaceEnabled(data.enable);
        setSpeed(data.speed);
        setMtu(data.mtu);
        setEnableLLDP(data.lldp);
        setAuthentication(data[`${eth}xauth`]);

        const newAuthData = {
          md5: data.md5 || {},
          tls: data.tls || {},
          pwd: data.pwd || {},
          fast: data.fast || {},
          peap: data.peap || {},
          ttls: data.ttls || {},
        };
        setAuthData(newAuthData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    setAuthData((prevState) => {
      const updatedData = { ...prevState };
      switch (fileType) {
        case "userCertificate":
          setUserCertFile(file);
          updatedData.tls.usercertfilename = file.name;
          break;
        case "caCertificate":
          setCaCertFile(file);
          updatedData.tls.cacertfilename = file.name;
          break;
        case "privateKey":
          setPrivateKeyFile(file);
          updatedData.tls.privatekeyfilename = file.name;
          break;
        default:
          break;
      }
      return updatedData;
    });
  };

  const handleSave = () => {
    const data = {
      enable: interfaceEnabled,
      speed: speed,
      mtu: mtu,
      lldp: enableLLDP,
      [`${eth}xauth`]: authentication,
    };

    if (authentication === "md5") {
      data.md5 = {
        username: authData.md5.username,
        password: authData.md5.password,
      };
    } else if (authentication === "tls") {
      data.tls = {
        identity: authData.tls.identity,
        usercertfilename: authData.tls.usercertfilename,
        usercert: userCertFile,
        noca: authData.tls.noca,
        cacertfilename: authData.tls.cacertfilename,
        cacert: caCertFile,
        privatekeyfilename: authData.tls.privatekeyfilename,
        privatekey: privateKeyFile,
        privatekeypassword: authData.tls.privatekeypassword,
      };
    } else if (authentication === "pwd") {
      data.pwd = {
        username: authData.pwd.username,
        password: authData.pwd.password,
      };
    } else if (authentication === "fast") {
      data.fast = {
        anonymousidentity: authData.fast.anonymousidentity,
        allowautopac: authData.fast.allowautopac,
        autopac: authData.fast.autopac,
        pacfilename: authData.fast.pacfilename,
        pacfile: authData.fast.pacfile,
        innerauthentication: authData.fast.innerauthentication,
        username: authData.fast.username,
        password: authData.fast.password,
      };
    } else if (authentication === "peap") {
      data.peap = {
        anonymousidentity: authData.peap.anonymousidentity,
        noca: authData.peap.noca,
        cacertfilnema: authData.peap.cacertfilnema,
        cacert: authData.peap.cacert,
        peapversion: authData.peap.peapversion,
        innerauthentication: authData.peap.innerauthentication,
        username: authData.peap.username,
        password: authData.peap.password,
      };
    } else if (authentication === "ttls") {
      data.ttls = {
        anonymousidentity: authData.ttls.anonymousidentity,
        domain: authData.ttls.domain,
        noca: authData.ttls.noca,
        cacertificate: authData.ttls.cacertificate,
        cacertificatedata: authData.ttls.cacert,
        innerauthentication: authData.ttls.innerauthentication,
        username: authData.ttls.username,
        password: authData.ttls.password,
      };
    }

    axios
      .put(`/api/devicesettings/network/${eth}`, data)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        // handle success response
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        // handle error response
      });
  };

  const authenticationOptions = [
    { value: "noauth", label: "No Authentication" },
    { value: "md5", label: "MD5" },
    { value: "tls", label: "TLS" },
    { value: "pwd", label: "PWD" },
    { value: "fast", label: "FAST" },
    { value: "peap", label: "PEAP" },
    { value: "ttls", label: "Tunneled TLS" },
  ];

  const renderAuthenticationFields = () => {
    switch (authentication) {
      case "md5":
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={authData.md5.username || ""}
              onChange={(e) => setAuthData({ ...authData, md5: { ...authData.md5, username: e.target.value } })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={authData.md5.password || ""}
              onChange={(e) => setAuthData({ ...authData, md5: { ...authData.md5, password: e.target.value } })}
            />
          </>
        );
      case "tls":
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Identity"
              value={authData.tls.identity || ""}
              onChange={(e) => setAuthData({ ...authData, tls: { ...authData.tls, identity: e.target.value } })}
            />
            <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="User Certificate"
              InputProps={{ inputProps: { accept: ".pem,.crt" } }}
              onChange={(e) => handleFileUpload(e, "userCertificate")}
              fullWidth
              margin="normal"
            />
            {userCertFile && (
              <Typography variant="body2" color="textSecondary">
                {userCertFile.name}
              </Typography>
            )}
            <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="CA Certificate"
              InputProps={{ inputProps: { accept: ".pem,.crt" } }}
              onChange={(e) => handleFileUpload(e, "caCertificate")}
              fullWidth
              margin="normal"
            />
            {caCertFile && (
              <Typography variant="body2" color="textSecondary">
                {caCertFile.name}
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={authData.tls.noca || false}
                  onChange={(e) => setAuthData({ ...authData, tls: { ...authData.tls, noca: e.target.checked } })}
                />
              }
              label="No CA certificate required"
            />
            <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Private Key"
              InputProps={{ inputProps: { accept: ".key" } }}
              onChange={(e) => handleFileUpload(e, "privateKey")}
              fullWidth
              margin="normal"
            />
            {privateKeyFile && (
              <Typography variant="body2" color="textSecondary">
                {privateKeyFile.name}
              </Typography>
            )}
            <TextField
              fullWidth
              margin="normal"
              label="Private Key Password"
              type="password"
              variant="outlined"
              value={authData.tls.privatekeypassword || ""}
              onChange={(e) =>
                setAuthData({ ...authData, tls: { ...authData.tls, privatekeypassword: e.target.value } })
              }
            />
          </>
        );
      case "pwd":
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={authData.pwd.username || ""}
              onChange={(e) => setAuthData({ ...authData, pwd: { ...authData.pwd, username: e.target.value } })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={authData.pwd.password || ""}
              onChange={(e) => setAuthData({ ...authData, pwd: { ...authData.pwd, password: e.target.value } })}
            />
          </>
        );
      case "fast":
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Anonymous Identity"
              value={authData.fast.anonymousidentity || ""}
              onChange={(e) =>
                setAuthData({ ...authData, fast: { ...authData.fast, anonymousidentity: e.target.value } })
              }
            />
            <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="PAC File"
              InputProps={{ inputProps: { accept: ".pac" } }}
              onChange={(e) => handleFileUpload(e, "pacFile")}
              fullWidth
              margin="normal"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={authData.fast.username || ""}
              onChange={(e) => setAuthData({ ...authData, fast: { ...authData.fast, username: e.target.value } })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={authData.fast.password || ""}
              onChange={(e) => setAuthData({ ...authData, fast: { ...authData.fast, password: e.target.value } })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={authData.fast.allowautopac || false}
                  onChange={(e) =>
                    setAuthData({ ...authData, fast: { ...authData.fast, allowautopac: e.target.checked } })
                  }
                />
              }
              label="Allow Automatic PAC Provisioning"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="pac-provisioning-label">Provisioning Mode</InputLabel>
              <Select
                labelId="pac-provisioning-label"
                id="pac-provisioning-select"
                value={authData.fast.autopac || ""}
                onChange={(e) => setAuthData({ ...authData, fast: { ...authData.fast, autopac: e.target.value } })}
                label="Provisioning Mode"
              >
                <MenuItem value="anonymous">Anonymous</MenuItem>
                <MenuItem value="authenticated">Authenticated</MenuItem>
                <MenuItem value="both">Both</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case "peap":
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Anonymous Identity"
              value={authData.peap.anonymousidentity || ""}
              onChange={(e) =>
                setAuthData({ ...authData, peap: { ...authData.peap, anonymousidentity: e.target.value } })
              }
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="peap-version-label">PEAP Version</InputLabel>
              <Select
                labelId="peap-version-label"
                id="peap-version-select"
                value={authData.peap.peapversion || ""}
                onChange={(e) => setAuthData({ ...authData, peap: { ...authData.peap, peapversion: e.target.value } })}
                label="PEAP Version"
              >
                <MenuItem value="auto">Automatic</MenuItem>
                <MenuItem value="peapv0">Version 0</MenuItem>
                <MenuItem value="peapv1">Version 1</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="inner-authentication-label">Inner Authentication</InputLabel>
              <Select
                labelId="inner-authentication-label"
                id="inner-authentication-select"
                value={authData.peap.innerauthentication || ""}
                onChange={(e) =>
                  setAuthData({ ...authData, peap: { ...authData.peap, innerauthentication: e.target.value } })
                }
                label="Inner Authentication"
              >
                <MenuItem value="mschapv2">MSCHAPv2</MenuItem>
                <MenuItem value="md5">MD5</MenuItem>
                <MenuItem value="gtc">GTC</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={authData.peap.username || ""}
              onChange={(e) => setAuthData({ ...authData, peap: { ...authData.peap, username: e.target.value } })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={authData.peap.password || ""}
              onChange={(e) => setAuthData({ ...authData, peap: { ...authData.peap, password: e.target.value } })}
            />
          </>
        );
      case "ttls":
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Anonymous Identity"
              value={authData.ttls.anonymousidentity || ""}
              onChange={(e) =>
                setAuthData({ ...authData, ttls: { ...authData.ttls, anonymousidentity: e.target.value } })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Domain"
              value={authData.ttls.domain || ""}
              onChange={(e) => setAuthData({ ...authData, ttls: { ...authData.ttls, domain: e.target.value } })}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="inner-authentication-label">Inner Authentication</InputLabel>
              <Select
                labelId="inner-authentication-label"
                id="inner-authentication-select"
                value={authData.ttls.innerauthentication || ""}
                onChange={(e) =>
                  setAuthData({ ...authData, ttls: { ...authData.ttls, innerauthentication: e.target.value } })
                }
                label="Inner Authentication"
              >
                <MenuItem value="pap">PAP</MenuItem>
                <MenuItem value="mschap">MSCHAP</MenuItem>
                <MenuItem value="mschapv2">MSCHAPv2</MenuItem>
                <MenuItem value="mschapv2-nopeap">MSCHAPv2 (No PEAP)</MenuItem>
                <MenuItem value="chap">CHAP</MenuItem>
                <MenuItem value="md5">MD5</MenuItem>
                <MenuItem value="gtc">GTC</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={authData.ttls.username || ""}
              onChange={(e) => setAuthData({ ...authData, ttls: { ...authData.ttls, username: e.target.value } })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={authData.ttls.password || ""}
              onChange={(e) => setAuthData({ ...authData, ttls: { ...authData.ttls, password: e.target.value } })}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box p={3}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={interfaceEnabled} onChange={(e) => setInterfaceEnabled(e.target.checked)} />}
          label="Enable interface"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Speed/Duplex</InputLabel>
          <Select value={speed} onChange={(e) => setSpeed(e.target.value)} label="Speed/Duplex">
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="10h">10 MB/s Half-Duplex</MenuItem>
            <MenuItem value="10f">10 MB/s Full-Duplex</MenuItem>
            <MenuItem value="100h">100 MB/s Half-Duplex</MenuItem>
            <MenuItem value="100f">100 MB/s Full-Duplex</MenuItem>
            <MenuItem value="1000f">1 GB/s Full-Duplex</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth margin="normal" label="MTU" value={mtu} onChange={(e) => setMtu(e.target.value)} />

        <FormControlLabel
          control={<Checkbox checked={enableLLDP} onChange={(e) => setEnableLLDP(e.target.checked)} />}
          label="Enable LLDP"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>802.11X Authentication</InputLabel>
          <Select
            value={authentication}
            onChange={(e) => {
              setAuthentication(e.target.value);
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

        {renderAuthenticationFields()}

        <Box display="flex" justifyContent="end">
          <MuiButton variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: "12px" }}>
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
  const [networkMode, setNetworkMode] = useState("independent");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    // Fetch the initial network mode from the API
    axios
      .get("/api/devicesettings/network/networkmode")
      .then((response) => {
        console.log(response.data.networkmode);
        setNetworkMode(response.data.networkmode);
      })
      .catch((error) => {
        console.error("Error fetching network mode:", error);
      });
  }, []);

  const handleNetworkModeChange = (event) => {
    const newMode = event.target.value;
    setNetworkMode(newMode);

    // Update the network mode in the API
    axios
      .put("/api/devicesettings/network/networkmode", { networkmode: newMode })
      .then((response) => {
        console.log("Network mode updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating network mode:", error);
      });
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Network">
            <FormControl fullWidth>
              <InputLabel id="network-mode-select-label">Network Mode</InputLabel>
              <Select
                labelId="network-mode-select-label"
                id="network-mode-select"
                value={networkMode}
                label="Network Mode"
                onChange={handleNetworkModeChange}
                sx={{ marginBottom: "20px" }}
              >
                <MenuItem value="independent">Independent</MenuItem>
                <MenuItem value="vrf">VRF</MenuItem>
                <MenuItem value="linklocal">Link-Local</MenuItem>
              </Select>
            </FormControl>

            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <CollapsiableNamedContainer
                  title={networkMode == "vrf" || networkMode == "linklocal" ? "IPv4-Eth1" : "IPv4"}
                >
                  <IPv4
                    mode={networkMode}
                    eth="eth1"
                    snackbar={{
                      setSnackbarOpen: setSnackbarOpen,
                      setSnackbarMessage: setSnackbarMessage,
                      setSnackbarSeverity: setSnackbarSeverity,
                    }}
                  />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer
                  title={networkMode == "vrf" || networkMode == "linklocal" ? "IPv6-Eth1" : "IPv6"}
                >
                  <IPv6
                    mode={networkMode}
                    eth="eth1"
                    snackbar={{
                      setSnackbarOpen: setSnackbarOpen,
                      setSnackbarMessage: setSnackbarMessage,
                      setSnackbarSeverity: setSnackbarSeverity,
                    }}
                  />
                </CollapsiableNamedContainer>
              </Grid>
              {networkMode == "vrf" && (
                <>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title={networkMode == "vrf" ? "IPv4-Eth2" : "IPv4"}>
                      <IPv4
                        mode={networkMode}
                        eth="eth2"
                        snackbar={{
                          setSnackbarOpen: setSnackbarOpen,
                          setSnackbarMessage: setSnackbarMessage,
                          setSnackbarSeverity: setSnackbarSeverity,
                        }}
                      />
                    </CollapsiableNamedContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title={networkMode == "vrf" ? "IPv6-Eth2" : "IPv6"}>
                      <IPv6
                        mode={networkMode}
                        eth="eth2"
                        snackbar={{
                          setSnackbarOpen: setSnackbarOpen,
                          setSnackbarMessage: setSnackbarMessage,
                          setSnackbarSeverity: setSnackbarSeverity,
                        }}
                      />
                    </CollapsiableNamedContainer>
                  </Grid>
                </>
              )}
              {(networkMode === "vrf" || networkMode === "independent") && (
                <>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="ETH1">
                      <InterfaceSettings eth="eth1" />
                    </CollapsiableNamedContainer>
                  </Grid>
                  {networkMode !== "linklocal" && (
                    <Grid item xs={12}>
                      <CollapsiableNamedContainer title="ETH2">
                        <InterfaceSettings eth="eth2" />
                      </CollapsiableNamedContainer>
                    </Grid>
                  )}
                </>
              )}
              {networkMode === "linklocal" && (
                <Grid item xs={12}>
                  <CollapsiableNamedContainer title="ETH1">
                    <InterfaceSettings eth="eth1" />
                  </CollapsiableNamedContainer>
                </Grid>
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Network;
