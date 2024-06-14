import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  Switch,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Alert,
  InputAdornment,
  FormLabel,
  RadioGroup,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  // Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Dialog from "../../../components/common/DialogWithClose";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import MuiButton from "../../../components/common/styled/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function HTTPSettingsPanel() {
  const [settings, setSettings] = React.useState({
    httpEnabled: false,
    httpsEnabled: false,
    httpPort: "80",
    httpsPort: "443",
    enforceHttps: false,
    hstsEnabled: false,
  });

  useEffect(() => {
    axios
      .get(`/api/devicesettings/networkservices/webaccess`)
      .then((response) => {
        const data = response.data;
        const fetched_settings = {
          httpEnabled: data.http,
          httpsEnabled: data.https,
          httpPort: data.httpport,
          httpsPort: data.httpsport,
          enforceHttps: data.httpredirect,
          hstsEnabled: data.hsts,
        };
        setSettings(fetched_settings);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    const data = {
      http: settings.httpEnabled,
      httpport: settings.httpPort,
      https: settings.httpsEnabled,
      httpsport: settings.httpsPort,
      httpredirect: settings.enforceHttps,
      hsts: settings.hstsEnabled,
    };
    axios
      .put(`/api/devicesettings/networkservices/webaccess`, data)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <Box maxWidth="sm">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={settings.httpEnabled} onChange={handleChange} name="httpEnabled" color="primary" />
            }
            label="Enable HTTP access"
          />
          {settings.httpEnabled && (
            <TextField
              label="HTTP Port"
              type="number"
              name="httpPort"
              value={settings.httpPort}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
          )}
          <FormControlLabel
            control={
              <Switch checked={settings.enforceHttps} onChange={handleChange} name="enforceHttps" color="primary" />
            }
            label="Enforce use of HTTPS"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={settings.httpsEnabled} onChange={handleChange} name="httpsEnabled" color="primary" />
            }
            label="Enable HTTPS access"
          />
          {settings.httpsEnabled && (
            <>
              <TextField
                label="HTTPS Port"
                type="number"
                name="httpsPort"
                value={settings.httpsPort}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch checked={settings.hstsEnabled} onChange={handleChange} name="hstsEnabled" color="primary" />
                }
                label="Enable HSTS"
              />
            </>
          )}
        </FormGroup>
      </Box>
      <Box display="flex" justifyContent="end">
        <MuiButton variant="contained" color="primary" onClick={handleSave}>
          Save
        </MuiButton>
      </Box>
    </>
  );
}

function SNMPSettingsNotification() {
  const [settings, setSettings] = useState({
    snmpV1V2cEnabled: false,
    snmpV3Enabled: false,
    snmpServers: [
      { id: 1, ipAddress: "192.168.1.15", port: "162", version: "SNMPv1", community: "public" },
      {
        id: 2,
        ipAddress: "FF80::48",
        port: "162",
        version: "SNMPv3",
        username: "user1",
        password: "pass1",
        securityLevel: "authPriv",
        authProtocol: "SHA",
        authPassphrase: "authpass",
      },
    ],
    snmpNotificationsEnabled: false,
    newServer: {
      ipAddress: "",
      port: "162",
      version: "",
      community: "",
      username: "",
      password: "",
      securityLevel: "",
      authProtocol: "",
      authPassphrase: "",
    },
    editMode: false,
  });

  const handleInputChange = (event) => {
    setSettings({
      ...settings,
      newServer: {
        ...settings.newServer,
        [event.target.name]: event.target.value,
      },
    });
  };

  const openEditDialog = (server) => {
    setSettings({ ...settings, newServer: server, editMode: true });
  };

  const closeDialog = () => {
    setSettings({ ...settings, newServer: {}, editMode: false });
  };

  const saveServer = () => {
    if (settings.editMode) {
      const updatedServers = settings.snmpServers.map((s) => (s.id === settings.newServer.id ? settings.newServer : s));
      setSettings({ ...settings, snmpServers: updatedServers, editMode: false, newServer: {} });
    } else {
      const newId = settings.snmpServers.reduce((acc, curr) => (acc > curr.id ? acc : curr.id), 0) + 1;
      const newServer = { ...settings.newServer, id: newId };
      setSettings({ ...settings, snmpServers: [...settings.snmpServers, newServer], newServer: {}, editMode: false });
    }
  };

  const deleteServer = (id) => {
    const updatedServers = settings.snmpServers.filter((s) => s.id !== id);
    setSettings({ ...settings, snmpServers: updatedServers });
  };

  const renderSNMPv3Fields = () => (
    <>
      <TextField
        label="Username"
        name="username"
        value={settings.newServer.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        value={settings.newServer.password}
        onChange={handleInputChange}
        type="password"
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="securityLevel-label">Security Level</InputLabel>
        <Select
          labelId="securityLevel-label"
          name="securityLevel"
          value={settings.newServer.securityLevel}
          onChange={handleInputChange}
          label="Security Level"
        >
          <MenuItem value="noAuthNoPriv">NoAuthNoPriv</MenuItem>
          <MenuItem value="authNoPriv">AuthNoPriv</MenuItem>
          <MenuItem value="authPriv">AuthPriv</MenuItem>
        </Select>
      </FormControl>
      {settings.newServer.securityLevel !== "noAuthNoPriv" && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel id="authProtocol-label">Authentication Protocol</InputLabel>
            <Select
              labelId="authProtocol-label"
              name="authProtocol"
              value={settings.newServer.authProtocol}
              onChange={handleInputChange}
              label="Authentication Protocol"
            >
              <MenuItem value="MD5">MD5</MenuItem>
              <MenuItem value="SHA">SHA</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Authentication Passphrase"
            name="authPassphrase"
            value={settings.newServer.authPassphrase}
            onChange={handleInputChange}
            type="password"
            fullWidth
            margin="normal"
          />
        </>
      )}
    </>
  );

  return (
    <>
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
                <TableCell>Port</TableCell>
                <TableCell>SNMP Version</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {settings.snmpServers.map((server) => (
                <TableRow key={server.id}>
                  <TableCell>{server.ipAddress}</TableCell>
                  <TableCell>{server.port}</TableCell>
                  <TableCell>{server.version}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEditDialog(server)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteServer(server.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() =>
            setSettings({
              ...settings,
              newServer: {
                ipAddress: "",
                port: "162",
                version: "",
                community: "",
                username: "",
                password: "",
                securityLevel: "",
                authProtocol: "",
                authPassphrase: "",
              },
              editMode: false,
            })
          }
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Add SNMP Server
        </Button>
        <Dialog open={settings.editMode || Object.keys(settings.newServer).length > 0} onClose={closeDialog}>
          <DialogTitle>{settings.editMode ? "Edit SNMP Server" : "Add SNMP Server"}</DialogTitle>
          <DialogContent>
            <TextField
              label="IP Address"
              name="ipAddress"
              value={settings.newServer.ipAddress}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Port"
              name="port"
              value={settings.newServer.port}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="version-label">SNMP Version</InputLabel>
              <Select
                labelId="version-label"
                name="version"
                value={settings.newServer.version}
                onChange={handleInputChange}
                label="SNMP Version"
              >
                <MenuItem value="SNMPv1">SNMPv1</MenuItem>
                <MenuItem value="SNMPv2">SNMPv2</MenuItem>
                <MenuItem value="SNMPv3">SNMPv3</MenuItem>
              </Select>
            </FormControl>
            {settings.newServer.version === "SNMPv3" ? (
              renderSNMPv3Fields()
            ) : (
              <TextField
                label="Community"
                name="community"
                value={settings.newServer.community}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={saveServer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}

function SNMPSettings() {
  const [settings, setSettings] = React.useState({
    snmpV1V2cEnabled: false,
    readCommunityString: "public",
    writeCommunityString: "private",
    snmpV3Enabled: false,
    sysContact: "",
    sysName: "",
    sysLocation: "",
    SNMP_Port: "",
    // SNMP Notifications
    snmpNotificationsEnabled: false,
    notificationType: "",
    engineID: "",
    host: "",
    port: "162",
    userID: "",
    securityLevel: "",
    authenticationProtocol: "",
    authenticationPassphrase: "",
    confirmAuthenticationPassphrase: "",
    privacyProtocol: "",
    privacyPassphrase: "",
    confirmPrivacyPassphrase: "",
  });

  const handleChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.checked });
  };

  const handleSave = () => {
    console.log("Settings saved", settings);
    // Implement save logic here
  };

  const renderSNMPv3ConfigFields = () => (
    <>
      {/* <TextField
        label="Username"
        name="username"
        value={settings.username}
        onChange={handleChange}
        margin="normal"
        fullWidth
      /> */}
      <TextField
        margin="normal"
        id="securityLevel"
        name="securityLevel"
        value={settings.securityLevel}
        onChange={handleChange}
        select // tell TextField to render select
        label="Security Level"
      >
        <MenuItem value="noAuthNoPriv">NoAuthNoPriv</MenuItem>
        <MenuItem value="authNoPriv">AuthNoPriv</MenuItem>
        <MenuItem value="authPriv">AuthPriv</MenuItem>
      </TextField>
      {settings.securityLevel !== "noAuthNoPriv" && (
        <>
          <TextField
            margin="normal"
            id="authProtocol"
            name="authProtocol"
            value={settings.authProtocol}
            onChange={handleChange}
            select // tell TextField to render select
            label="Authentication Protocol"
          >
            <MenuItem value="MD5">MD5</MenuItem>
            <MenuItem value="SHA">SHA</MenuItem>
          </TextField>
          {/* <TextField
            label="Authentication Passphrase"
            name="authPassphrase"
            value={settings.authPassphrase}
            onChange={handleChange}
            type="password"
            margin="normal"
            fullWidth
          /> */}
        </>
      )}
      {settings.securityLevel === "authPriv" && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel id="priv-protocol-label">Privacy Protocol</InputLabel>
            <Select
              labelId="priv-protocol-label"
              id="privProtocol"
              name="privProtocol"
              value={settings.privProtocol}
              onChange={handleChange}
            >
              <MenuItem value="DES">DES</MenuItem>
              <MenuItem value="AES">AES</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Privacy Passphrase"
            name="privPassphrase"
            value={settings.privPassphrase}
            onChange={handleChange}
            type="password"
            margin="normal"
            fullWidth
          />
        </>
      )}
    </>
  );

  return (
    <>
      <Box>
        {/* <Typography variant="h6" gutterBottom>
        SNMP Agent
      </Typography> */}
        <FormGroup>
          <Typography variant="h6" gutterBottom>
            SNMP System Information
          </Typography>
          {
            <>
              <TextField
                label="sysContact"
                name="sysContact"
                value={settings.sysContact}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="sysName"
                name="sysName"
                value={settings.sysName}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="sysLocation"
                name="sysLocation"
                value={settings.sysLocation}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="SNMP Port"
                name="SNMP Port"
                value={settings.SNMP_Port}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <FormControlLabel
                control={<Switch checked={settings.snmpV1V2cEnabled} onChange={handleChange} name="snmpV1V2cEnabled" />}
                label="Enable SNMP v1 / v2c"
              />
              <FormGroup>
                {settings.snmpV1V2cEnabled && (
                  <Alert severity="warning">Warning: An insecure protocol is activated.</Alert>
                )}
              </FormGroup>
              {settings.snmpV1V2cEnabled && (
                <>
                  <TextField
                    label="Read community string"
                    name="readCommunityString"
                    value={settings.readCommunityString}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    label="Write community string"
                    name="writeCommunityString"
                    value={settings.writeCommunityString}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                  />
                </>
              )}
              <FormControlLabel
                control={<Switch checked={settings.snmpV3Enabled} onChange={handleChange} name="snmpV3Enabled" />}
                label="Enable SNMP v3"
              />
              {settings.snmpV3Enabled && renderSNMPv3ConfigFields()}
            </>
          }
        </FormGroup>
        <FormGroup>
          <Typography variant="subtitle1" gutterBottom>
            SNMP Notifications
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.snmpNotificationsEnabled}
                onChange={handleSwitchChange}
                name="snmpNotificationsEnabled"
              />
            }
            label="Enable SNMP notifications"
          />
          {settings.snmpNotificationsEnabled && <SNMPSettingsNotification />}
        </FormGroup>
        <Box display="flex" justifyContent="end" sx={{ marginTop: "12px" }}>
          <MuiButton variant="contained" color="primary" onClick={handleSave}>
            Save
          </MuiButton>
        </Box>
      </Box>
    </>
  );
}

function SMTPSettings() {
  const [smtpSettings, setSmtpSettings] = useState({
    ipAddress: "",
    port: 25,
    senderEmail: "",
    retries: 2,
    retryTime: 2,
    requiresAuth: false,
    username: "",
    password: "",
    smtpOverTls: false,
    caCertificate: "",
    allowInvalidCerts: false,
    recipientEmail: "",
  });

  useEffect(() => {
    axios
      .get("/api/devicesettings/networkservices/smtp")
      .then((response) => {
        const data = response.data;

        setSmtpSettings((prevSettings) => ({
          ...prevSettings,
          ipAddress: data.smtpserver,
          port: data.smtpport,
          senderEmail: data.smtpsendfrom,
          requiresAuth: data.smtpauthentication,
          username: data.smtpusername,
          password: data.smtppassword,
          smtpOverTls: data.smtptls,
          allowInvalidCerts: data.smtpnocheckcert,
        }));
      })
      .catch((error) => {
        console.error("Error fetching SMTP settings:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setSmtpSettings({
      ...smtpSettings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    console.log("SMTP Settings:", smtpSettings);
    const dataToSend = {
      smtpenable: true, // assuming this value is static
      smtpserver: smtpSettings.ipAddress,
      smtpport: smtpSettings.port,
      smtpsendfrom: smtpSettings.senderEmail,
      smtpauthentication: smtpSettings.requiresAuth,
      smtpusername: smtpSettings.username,
      smtppassword: smtpSettings.password,
      smtptls: smtpSettings.smtpOverTls,
      smtpnocheckcert: smtpSettings.allowInvalidCerts,
    };

    axios
      .put("/api/devicesettings/networkservices/smtp", dataToSend)
      .then((response) => {
        console.log("SMTP settings updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating SMTP settings:", error);
      });
  };

  const sendTestEmail = () => {
    const data = {
      sento: smtpSettings.recipientEmail,
    };

    if (smtpSettings.recipientEmail !== "") {
      axios
        .post(`/api/devicesettings/networkservices/smtptest`, data)
        .then(() => {
          console.log("Email Sent");
        })
        .catch((error) => {
          console.error("Error in sending email", error);
        });
    }
  };

  return (
    <>
      <Box>
        <FormGroup>
          <TextField
            label="IP address/hostname"
            name="ipAddress"
            value={smtpSettings.ipAddress}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Port"
            name="port"
            type="number"
            value={smtpSettings.port}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Sender email address"
            name="senderEmail"
            value={smtpSettings.senderEmail}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
          {/* <TextField
          label="Number of sending retries"
          name="retries"
          type="number"
          value={smtpSettings.retries}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Time between sending retries"
          name="retryTime"
          type="number"
          value={smtpSettings.retryTime}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          }}
        /> */}
          <FormControlLabel
            control={<Switch checked={smtpSettings.requiresAuth} onChange={handleInputChange} name="requiresAuth" />}
            label="Server requires authentication"
          />
          {smtpSettings.requiresAuth && (
            <>
              <TextField
                label="User name"
                name="username"
                value={smtpSettings.username}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={smtpSettings.password === true ? "********" : smtpSettings.password || ""}
                onFocus={(e) => {
                  if (e.target.value === "********") {
                    e.target.value = "";
                    handleInputChange(e);
                  }
                }}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
            </>
          )}
          <FormControlLabel
            control={<Switch checked={smtpSettings.smtpOverTls} onChange={handleInputChange} name="smtpOverTls" />}
            label="Enable SMTP over TLS (StartTLS)"
          />
          {/* <div style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
          <Button variant="contained" component="label">
            Browse...
            <input
              type="file"
              hidden
              onChange={(event) => {
                setSmtpSettings({
                  ...smtpSettings,
                  caCertificate: event.target.files[0].name,
                });
              }}
            />
          </Button>
          <Typography style={{ marginLeft: 16 }}>{smtpSettings.caCertificate || "not set"}</Typography>
        </div> */}
          <FormControlLabel
            control={
              <Checkbox
                checked={smtpSettings.allowInvalidCerts}
                onChange={handleInputChange}
                name="allowInvalidCerts"
              />
            }
            label="Allow expired and not yet valid certificates"
          />
          <Box display="flex" justifyContent="end" mt={2}>
            <MuiButton variant="contained" color="primary" onClick={handleSave}>
              Save
            </MuiButton>
          </Box>
          <Typography variant="h5" gutterBottom>
            Test SMTP Settings
          </Typography>
          <TextField
            label="Recipient email addresses"
            name="recipientEmail"
            value={smtpSettings.recipientEmail}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={sendTestEmail}>
            Send Test Email
          </Button>
        </FormGroup>
      </Box>
    </>
  );
}

function SSHSettings() {
  const [sshSettings, setSSHSettings] = useState({
    enableSSH: false,
    sshPort: "22",
    authMethod: "userpass",
    rsaPublicKey: "",
    rsaFingerprintSHA256: "",
    rsaFingerprintMD5: "",
    ecdsaPublicKey: "",
    ecdsaFingerprintSHA256: "",
    ed25519PublicKey: "",
    ed25519FingerprintSHA256: "",
  });

  useEffect(() => {
    axios
      .get("/api/devicesettings/networkservices/ssh")
      .then((response) => {
        const data = response.data;

        setSSHSettings({
          enableSSH: data.sshenable,
          sshPort: data.sshport,
          authMethod: data.sshtype,
          rsaPublicKey: data.sshrsakey,
          rsaFingerprintSHA256: "", // Assuming these values are to be fetched or calculated separately
          rsaFingerprintMD5: "", // Assuming these values are to be fetched or calculated separately
          ecdsaPublicKey: data.sshecdsa,
          ecdsaFingerprintSHA256: "", // Assuming these values are to be fetched or calculated separately
          ed25519PublicKey: data.sshed25519,
          ed25519FingerprintSHA256: "", // Assuming these values are to be fetched or calculated separately
        });
      })
      .catch((error) => {
        console.error("Error fetching SSH settings:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setSSHSettings({
      ...sshSettings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    const dataToSend = {
      sshenable: sshSettings.enableSSH,
      sshport: sshSettings.sshPort,
      sshtype: sshSettings.authMethod,
      sshrsakey: sshSettings.rsaPublicKey,
      sshecdsa: sshSettings.ecdsaPublicKey,
      sshed25519: sshSettings.ed25519PublicKey,
    };

    axios
      .put("/api/devicesettings/networkservices/ssh", dataToSend)
      .then((response) => {
        console.log("SSH settings updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating SSH settings:", error);
      });
  };

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={sshSettings.enableSSH} onChange={handleInputChange} name="enableSSH" />}
          label="Enable SSH access"
        />
        <TextField
          label="SSH port"
          name="sshPort"
          type="number"
          value={sshSettings.sshPort}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Authentication</FormLabel>
          <RadioGroup name="authMethod" value={sshSettings.authMethod} onChange={handleInputChange} row>
            <FormControlLabel value="userpass" control={<Radio />} label="Password authentication only" />
            <FormControlLabel value="publickey" control={<Radio />} label="Public key authentication only" />
            <FormControlLabel
              value="userpasspublickey"
              control={<Radio />}
              label="Password and public key authentication"
            />
          </RadioGroup>
        </FormControl>

        {/* SSH Host Keys */}
        {(sshSettings.authMethod == "publickey" || sshSettings.authMethod == "userpasspublickey") && (
          <Typography variant="subtitle1" gutterBottom>
            SSH Host Keys
          </Typography>
        )}
        {(sshSettings.authMethod == "publickey" || sshSettings.authMethod == "userpasspublickey") && (
          <TextField
            label="RSA Public Key"
            name="rsaPublicKey"
            value={sshSettings.rsaPublicKey}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
        )}
        {(sshSettings.authMethod == "publickey" || sshSettings.authMethod == "userpasspublickey") && (
          <TextField
            label="RSA Fingerprint (SHA256)"
            name="rsaFingerprintSHA256"
            value={sshSettings.rsaFingerprintSHA256}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
        )}
        {(sshSettings.authMethod == "publickey" || sshSettings.authMethod == "userpasspublickey") && (
          <TextField
            label="RSA Fingerprint (MD5)"
            name="rsaFingerprintMD5"
            value={sshSettings.rsaFingerprintMD5}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
        )}
        {(sshSettings.authMethod == "publickey" || sshSettings.authMethod == "userpasspublickey") && (
          <TextField
            label="ECDSA Public Key"
            name="ecdsaPublicKey"
            value={sshSettings.ecdsaPublicKey}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
        )}
        {(sshSettings.authMethod == "publickey" || sshSettings.authMethod == "userpasspublickey") && (
          <TextField
            label="ECDSA Fingerprint (SHA256)"
            name="ecdsaFingerprintSHA256"
            value={sshSettings.ecdsaFingerprintSHA256}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
        )}
        {(sshSettings.authMethod == "publickey" || sshSettings.authMethod == "userpasspublickey") && (
          <TextField
            label="Ed25519 Public Key"
            name="ed25519PublicKey"
            value={sshSettings.ed25519PublicKey}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
        )}
        {(sshSettings.authMethod == "publickey" || sshSettings.authMethod == "userpasspublickey") && (
          <TextField
            label="Ed25519 Fingerprint (SHA256)"
            name="ed25519FingerprintSHA256"
            value={sshSettings.ed25519FingerprintSHA256}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
          />
        )}

        <Box display="flex" justifyContent="end">
          <MuiButton variant="contained" color="primary" onClick={handleSave}>
            Save
          </MuiButton>
        </Box>
      </FormGroup>
    </Box>
  );
}

function ModbusSettings() {
  const [modbusSettings, setModbusSettings] = useState({
    enableModbusTcp: false,
    modbusTcpPort: "502",
    enableReadOnlyMode: false,
    enableModbusGateway: false,
    modbusGatewayTcpPort: "503",
    parity: "Even",
    lineSpeed: "19200",
    defaultAddress: "1",
  });

  useEffect(() => {
    axios
      .get("/api/devicesettings/networkservices/modbus")
      .then((response) => {
        const data = response.data;
        setModbusSettings({
          enableModbusTcp: data.modbusenable,
          modbusTcpPort: data.modbusport,
          enableReadOnlyMode: data.modbusro,
          enableModbusGateway: false, // Assuming default values for unmentioned fields
          modbusGatewayTcpPort: "503",
          parity: "Even",
          lineSpeed: "19200",
          defaultAddress: "1",
        });
      })
      .catch((error) => {
        console.error("Error fetching Modbus settings:", error);
      });
  }, []);

  const handleChange = (event) => {
    setModbusSettings({
      ...modbusSettings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    const dataToSend = {
      modbusenable: modbusSettings.enableModbusTcp,
      modbusport: parseInt(modbusSettings.modbusTcpPort, 10),
      modbusro: modbusSettings.enableReadOnlyMode,
    };

    axios
      .put("/api/devicesettings/networkservices/modbus", dataToSend)
      .then((response) => {
        console.log("Modbus settings saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving Modbus settings:", error);
      });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Modbus/TCP Access
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={modbusSettings.enableModbusTcp} onChange={handleChange} name="enableModbusTcp" />}
          label="Enable Modbus/TCP access"
        />
        <TextField
          label="Modbus/TCP port"
          name="modbusTcpPort"
          type="number"
          value={modbusSettings.modbusTcpPort}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch checked={modbusSettings.enableReadOnlyMode} onChange={handleChange} name="enableReadOnlyMode" />
          }
          label="Enable read-only mode"
        />
        <Button
          variant="text"
          onClick={() => {
            /* Logic to download CSV */
          }}
        >
          Download as CSV
        </Button>

        <Typography variant="h6" gutterBottom style={{ marginTop: "1em" }}>
          Modbus Gateway
        </Typography>
        <FormControlLabel
          control={
            <Switch checked={modbusSettings.enableModbusGateway} onChange={handleChange} name="enableModbusGateway" />
          }
          label="Enable Modbus gateway"
        />
        <TextField
          label="TCP port"
          name="modbusGatewayTcpPort"
          type="number"
          value={modbusSettings.modbusGatewayTcpPort}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <TextField select label="Parity" name="parity" value={modbusSettings.parity} onChange={handleChange}>
            <MenuItem value="Even">Even</MenuItem>
            <MenuItem value="Odd">Odd</MenuItem>
            <MenuItem value="None">None</MenuItem>
          </TextField>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            select
            label="Line speed"
            name="lineSpeed"
            value={modbusSettings.lineSpeed}
            onChange={handleChange}
          >
            <MenuItem value="9600">9600</MenuItem>
            <MenuItem value="19200">19200</MenuItem>
            <MenuItem value="38400">38400</MenuItem>
            <MenuItem value="57600">57600</MenuItem>
            <MenuItem value="115200">115200</MenuItem>
          </TextField>
        </FormControl>
        <TextField
          label="Default address"
          name="defaultAddress"
          type="number"
          value={modbusSettings.defaultAddress}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <Box display="flex" justifyContent="end">
          <MuiButton variant="contained" color="primary" onClick={handleSave}>
            Save
          </MuiButton>
        </Box>
      </FormGroup>
    </Box>
  );
}

const SyslogSettings = () => {
  const [syslogs, setSyslogs] = useState([]);
  const [currentSyslog, setCurrentSyslog] = useState({ ipAddress: "", port: "", severity: "5" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios
      .get("/api/devicesettings/networkservices/syslog")
      .then((response) => {
        setSyslogs(
          response.data.map((syslog, index) => ({
            id: index + 1,
            ipAddress: syslog.ipaddress,
            port: syslog.port,
            severity: syslog.severity,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching syslog settings:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setCurrentSyslog({ ...currentSyslog, [e.target.name]: e.target.value });
  };

  const openDialog = (syslog = { ipAddress: "", port: "", severity: "5" }, edit = false) => {
    setCurrentSyslog(syslog);
    setIsEdit(edit);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const saveSyslog = () => {
    const syslogToSave = {
      ipaddress: currentSyslog.ipAddress,
      port: parseInt(currentSyslog.port, 10),
      severity: parseInt(currentSyslog.severity, 10),
    };

    if (isEdit) {
      axios
        .put(`/api/devicesettings/networkservices/syslog/${currentSyslog.ipAddress}`, syslogToSave)
        .then((response) => {
          setSyslogs(syslogs.map((s) => (s.ipAddress === currentSyslog.ipAddress ? currentSyslog : s)));
        })
        .catch((error) => {
          console.error("Error updating syslog:", error);
        });
    } else {
      axios
        .post("/api/devicesettings/networkservices/syslog", syslogToSave)
        .then((response) => {
          setSyslogs([...syslogs, { ...currentSyslog, id: syslogs.length + 1 }]);
        })
        .catch((error) => {
          console.error("Error adding syslog:", error);
        });
    }
    closeDialog();
  };

  const deleteSyslog = (ipAddress) => {
    axios
      .delete(`/api/devicesettings/networkservices/syslog/${ipAddress}`)
      .then((response) => {
        setSyslogs(syslogs.filter((s) => s.ipAddress !== ipAddress));
      })
      .catch((error) => {
        console.error("Error deleting syslog:", error);
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>IP Address</TableCell>
              <TableCell>Port</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {syslogs.map((syslog) => (
              <TableRow key={syslog.id}>
                <TableCell>{syslog.ipAddress}</TableCell>
                <TableCell>{syslog.port}</TableCell>
                <TableCell>{syslog.severity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openDialog(syslog, true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteSyslog(syslog.ipAddress)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>{isEdit ? "Edit Syslog Server" : "Add Syslog Server"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="IP Address (IPv4 or IPv6)"
            type="text"
            fullWidth
            name="ipAddress"
            value={currentSyslog.ipAddress}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Port"
            type="number"
            fullWidth
            name="port"
            value={currentSyslog.port}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="severity-label">Severity</InputLabel>
            <Select
              labelId="severity-label"
              name="severity"
              value={currentSyslog.severity}
              onChange={handleInputChange}
              label="Severity"
            >
              <MenuItem value="0">0-Emergency</MenuItem>
              <MenuItem value="1">1-Alert</MenuItem>
              <MenuItem value="2">2-Critical</MenuItem>
              <MenuItem value="3">3-Error</MenuItem>
              <MenuItem value="4">4-Warning</MenuItem>
              <MenuItem value="5">5-Notice</MenuItem>
              <MenuItem value="6">6-Informational</MenuItem>
              <MenuItem value="7">7-Debug</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={saveSyslog} color="primary">
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="end">
        <Button
          onClick={() => openDialog()}
          variant="contained"
          color="primary"
          disabled={syslogs.length >= 5}
          sx={{ marginTop: "12px" }}
        >
          Add Syslog Server
        </Button>
      </Box>
    </>
  );
};

function NetworkServices() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Network Services">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Web Access/ API">
                  <HTTPSettingsPanel />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="SNMP">
                  <SNMPSettings />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="SMTP">
                  <SMTPSettings />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="SSH">
                  <SSHSettings />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="SYSLOG">
                  <SyslogSettings />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="MODBUS">
                  <ModbusSettings />
                </CollapsiableNamedContainer>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NetworkServices;
