import React, { useState } from "react";
import { Box, Grid, Typography, Paper, TextField, List, ListItem, ListItemText } from "@mui/material";
import NamedContainer, { CollapsiableNamedContainer } from "../../components/common/NamedContainer";

function Information() {
  return (
    <Box
      elevation={3}
      p={3}
      sx={{
        margin: "auto",
        width: "70%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Model"
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        value="Model XYZ" // Replace with actual data
      />
      <TextField
        label="Serial Number"
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        value="123456789" // Replace with actual data
      />
      <TextField
        label="Rating"
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        value="5 Stars" // Replace with actual data
      />
      <TextField
        label="Firmware Version"
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        value="v1.2.3" // Replace with actual data
      />
    </Box>
  );
}

function Network() {
  const commonSettings = {
    dnsServers: "none",
    dnsSuffixes: "none",
    dnsResolverPreference: "IPv6 address",
    ipv4Routes: "Default via 10.4.2.1 (ETH1)\n10.4.2.0/24 dev ETH1\n10.4.2.0/24 dev ETH2\nDefault via 10.4.2.1 (ETH2)",
    ipv6Routes: "none",
    portForwarding: "disabled",
  };

  const eth1Settings = {
    macAddress: "00:0d:5d:26:dd:92",
    linkState: "no link",
    mtu: "1500",
    authenticationState: "disabled",
    ipv4Address: "10.4.2.172/24",
  };

  const eth2Settings = {
    macAddress: "00:0d:5d:26:dd:93",
    linkState: "1 GBit/s, full duplex, link OK, autonegotiation on",
    mtu: "1500",
    authenticationState: "disabled",
    ipv4Address: "10.4.2.172/24",
  };

  const renderSettings = (settings) =>
    Object.entries(settings).map(([label, value]) => (
      <TextField
        key={label}
        label={label.replace(/([A-Z])/g, " $1").trim()} // Add spaces before capital letters
        value={value}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
        multiline
      />
    ));

  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        padding: "20px",
      }}
    >
      <Typography variant="h6">Common</Typography>
      {renderSettings(commonSettings)}

      <Typography variant="h6" sx={{ marginTop: "20px" }}>
        ETH1
      </Typography>
      {renderSettings(eth1Settings)}

      <Typography variant="h6" sx={{ marginTop: "20px" }}>
        ETH2
      </Typography>
      {renderSettings(eth2Settings)}
    </Box>
  );
}

function USBDevices() {
  const usbDevices = [
    { id: 1, name: "USB Flash Drive", status: "Connected" },
    { id: 2, name: "External USB Hard Drive", status: "Connected" },
    // ... add more USB devices as needed
  ];
  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Connected USB Devices
      </Typography>
      <Paper elevation={3}>
        <List>
          {usbDevices.map((device) => (
            <ListItem key={device.id}>
              <ListItemText primary={device.name} secondary={device.status} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

function Security() {
  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        SSH Host Keys
      </Typography>

      {/* RSA Public Key */}
      <TextField
        label="RSA Public Key"
        value="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQD..."
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
        multiline
        variant="outlined"
      />

      {/* RSA Fingerprint */}
      <TextField
        label="RSA Fingerprint (SHA256)"
        value="16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48..."
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
        variant="outlined"
      />

      {/* ECDSA Public Key */}
      <TextField
        label="ECDSA Public Key"
        value="ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTY..."
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
        multiline
        variant="outlined"
      />

      {/* ECDSA Fingerprint */}
      <TextField
        label="ECDSA Fingerprint (SHA256)"
        value="64:5e:57:2e:dc:04:8e:35:46:9d:1c:3b:f4:5e:99:c9..."
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
        variant="outlined"
      />

      {/* ED25519 Public Key */}
      <TextField
        label="ED25519 Public Key"
        value="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFjG3Dn0..."
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
        multiline
        variant="outlined"
      />

      {/* ED25519 Fingerprint */}
      <TextField
        label="ED25519 Fingerprint (SHA256)"
        value="e9:4c:1b:38:4a:de:7b:85:3b:5a:1c:63:15:1a:95:9d..."
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
        variant="outlined"
      />
    </Box>
  );
}

function PDUInformation() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="PDU Information">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Information">
                  <Information />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Network">
                  <Network />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="USB Devices">
                  <USBDevices />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Security">
                  <Security />
                </CollapsiableNamedContainer>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PDUInformation;
