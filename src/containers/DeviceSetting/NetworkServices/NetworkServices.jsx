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
} from "@mui/material";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";

function HTTPSettingsPanel() {
  const [settings, setSettings] = React.useState({
    httpEnabled: false,
    httpsEnabled: false,
    httpPort: "80",
    httpsPort: "443",
    enforceHttps: false,
    hstsEnabled: false,
  });

  const handleChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    console.log("Settings saved", settings);
    // Here you would typically send the settings to the server or some other appropriate handling
  };

  return (
    <Box maxWidth="sm">
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={settings.httpEnabled} onChange={handleChange} name="httpEnabled" color="primary" />}
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
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
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
      <TextField
        label="Username"
        name="username"
        value={settings.username}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="security-level-label">Security Level</InputLabel>
        <Select
          labelId="security-level-label"
          id="securityLevel"
          name="securityLevel"
          value={settings.securityLevel}
          onChange={handleChange}
        >
          <MenuItem value="noAuthNoPriv">NoAuthNoPriv</MenuItem>
          <MenuItem value="authNoPriv">AuthNoPriv</MenuItem>
          <MenuItem value="authPriv">AuthPriv</MenuItem>
        </Select>
      </FormControl>
      {settings.securityLevel !== "noAuthNoPriv" && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel id="auth-protocol-label">Authentication Protocol</InputLabel>
            <Select
              labelId="auth-protocol-label"
              id="authProtocol"
              name="authProtocol"
              value={settings.authProtocol}
              onChange={handleChange}
            >
              <MenuItem value="MD5">MD5</MenuItem>
              <MenuItem value="SHA">SHA</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Authentication Passphrase"
            name="authPassphrase"
            value={settings.authPassphrase}
            onChange={handleChange}
            type="password"
            margin="normal"
            fullWidth
          />
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
    <Box>
      <Typography variant="h6" gutterBottom>
        SNMP Agent
      </Typography>
      <FormGroup>
        {settings.snmpV1V2cEnabled && <Alert severity="warning">Warning: An insecure protocol is activated.</Alert>}
      </FormGroup>
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="notification-type-label">Notification type</InputLabel>
          <Select
            labelId="notification-type-label"
            label="Notification type"
            name="notificationType"
            value={settings.notificationType}
            onChange={handleChange}
          >
            <MenuItem value="SNMPv1 trap">SNMPv1 trap</MenuItem>
            <MenuItem value="SNMPv2c trap">SNMPv2c trap</MenuItem>
            <MenuItem value="SNMPv3 trap">SNMPv3 trap</MenuItem>
            {/* Add other notification types here */}
          </Select>
        </FormControl>
        <TextField
          label="Engine ID"
          name="engineID"
          value={settings.engineID}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField label="Host" name="host" value={settings.host} onChange={handleChange} margin="normal" fullWidth />
        <TextField
          label="Port"
          name="port"
          type="number"
          value={settings.port}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="User ID"
          name="userID"
          value={settings.userID}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Security Level"
          name="securityLevel"
          value={settings.securityLevel}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Authentication Protocol"
          name="authenticationProtocol"
          value={settings.authenticationProtocol}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Authentication Passphrase"
          name="authenticationPassphrase"
          value={settings.authenticationPassphrase}
          onChange={handleChange}
          margin="normal"
          fullWidth
          type="password"
        />
        <TextField
          label="Confirm Authentication Passphrase"
          name="confirmAuthenticationPassphrase"
          value={settings.confirmAuthenticationPassphrase}
          onChange={handleChange}
          margin="normal"
          fullWidth
          type="password"
        />
        <TextField
          label="Privacy Protocol"
          name="privacyProtocol"
          value={settings.privacyProtocol}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Privacy Passphrase"
          name="privacyPassphrase"
          value={settings.privacyPassphrase}
          onChange={handleChange}
          margin="normal"
          fullWidth
          type="password"
        />
        <TextField
          label="Confirm Privacy Passphrase"
          name="confirmPrivacyPassphrase"
          value={settings.confirmPrivacyPassphrase}
          onChange={handleChange}
          margin="normal"
          fullWidth
          type="password"
        />

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </FormGroup>
    </Box>
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

  const handleInputChange = (event) => {
    setSmtpSettings({
      ...smtpSettings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    console.log("SMTP Settings:", smtpSettings);
    // Save logic here
  };

  return (
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
              value={smtpSettings.password}
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
            <Checkbox checked={smtpSettings.allowInvalidCerts} onChange={handleInputChange} name="allowInvalidCerts" />
          }
          label="Allow expired and not yet valid certificates"
        />
        <Typography variant="subtitle1" gutterBottom>
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
        <Button variant="contained" color="primary" onClick={() => alert("Test email sent")}>
          Send Test Email
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSave} style={{ marginTop: 16 }}>
          Save
        </Button>
      </FormGroup>
    </Box>
  );
}

function SSHSettings() {
  const [sshSettings, setSSHSettings] = useState({
    enableSSH: false,
    sshPort: "22",
    authMethod: "password", // Possible values: 'password', 'publickey', 'both'
    rsaPublicKey: "",
    rsaFingerprintSHA256: "",
    rsaFingerprintMD5: "",
    ecdsaPublicKey: "",
    ecdsaFingerprintSHA256: "",
    ed25519PublicKey: "",
    ed25519FingerprintSHA256: "",
  });

  const handleInputChange = (event) => {
    setSSHSettings({
      ...sshSettings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    console.log("SSH Settings:", sshSettings);
    // Save logic here
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
            <FormControlLabel value="password" control={<Radio />} label="Password authentication only" />
            <FormControlLabel value="publickey" control={<Radio />} label="Public key authentication only" />
            <FormControlLabel value="both" control={<Radio />} label="Password and public key authentication" />
          </RadioGroup>
        </FormControl>

        {/* SSH Host Keys */}
        <Typography variant="subtitle1" gutterBottom>
          SSH Host Keys
        </Typography>
        <TextField
          label="RSA Public Key"
          name="rsaPublicKey"
          value={sshSettings.rsaPublicKey}
          margin="normal"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        {sshSettings.authMethod == "publickey" || (
          <TextField
            label="RSA Fingerprint (SHA256)"
            name="rsaFingerprintSHA256"
            value={sshSettings.rsaFingerprintSHA256}
            margin="normal"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        )}
        {sshSettings.authMethod == "publickey" || (
          <TextField
            label="RSA Fingerprint (MD5)"
            name="rsaFingerprintMD5"
            value={sshSettings.rsaFingerprintMD5}
            margin="normal"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        )}
        <TextField
          label="ECDSA Public Key"
          name="ecdsaPublicKey"
          value={sshSettings.ecdsaPublicKey}
          margin="normal"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        {sshSettings.authMethod == "publickey" || (
          <TextField
            label="ECDSA Fingerprint (SHA256)"
            name="ecdsaFingerprintSHA256"
            value={sshSettings.ecdsaFingerprintSHA256}
            margin="normal"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        )}
        <TextField
          label="Ed25519 Public Key"
          name="ed25519PublicKey"
          value={sshSettings.ed25519PublicKey}
          margin="normal"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        {sshSettings.authMethod == "publickey" || (
          <TextField
            label="Ed25519 Fingerprint (SHA256)"
            name="ed25519FingerprintSHA256"
            value={sshSettings.ed25519FingerprintSHA256}
            margin="normal"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        )}

        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 16 }}>
          Save
        </Button>
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

  const handleChange = (event) => {
    setModbusSettings({
      ...modbusSettings,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    console.log("Modbus Settings:", modbusSettings);
    // Save logic here
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

        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: "1em" }}>
          Save
        </Button>
      </FormGroup>
    </Box>
  );
}

function NetworkServices() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Network Services">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="HTTP">
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
