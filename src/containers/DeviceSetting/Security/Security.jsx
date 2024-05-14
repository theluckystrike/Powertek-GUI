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
  // Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "../../../components/common/DialogWithClose";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import SaveIcon from "@mui/icons-material/Save";
import MuiButton from "../../../components/common/styled/Button";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { MdOutlineAddModerator } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
}));

const RoleACL = ({ roles, onEdit, onAdd, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [editedRole, setEditedRole] = useState({
    name: "",
    description: "",
    permissions: { Only_Read: {}, Edit_Threshold: {}, Edit_Outlet_Status: {}, Edit_Configuration: {}, Full_access: {} },
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: { Only_Read: {}, Edit_Threshold: {}, Edit_Outlet_Status: {}, Edit_Configuration: {}, Full_access: {} },
  });

  const handleOpenDialog = (role, action = null) => {
    setEditedRole({ ...role }); // Create a copy of the role for editing
    setOpen(true);
  };

  const handleEditRoleDialog = (role, action = null) => {
    setEditedRole(role);
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditedRole({
      name: "",
      description: "",
      permissions: {
        Only_Read: {},
        Edit_Threshold: {},
        Edit_Outlet_Status: {},
        Edit_Configuration: {},
        Full_access: {},
      },
    }); // Clear the edited role
  };

  const handleCheckboxChange = (task, pdu, isChecked) => {
    // Update the edited role's permissions based on the checkbox that was toggled
    setEditedRole((prevEditedRole) => ({
      ...prevEditedRole,
      permissions: {
        ...prevEditedRole.permissions,
        [task]: {
          ...prevEditedRole.permissions[task],
          [pdu]: isChecked,
        },
      },
    }));
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setNewRole({
      name: "",
      description: "",
      permissions: {
        Only_Read: {},
        Edit_Threshold: {},
        Edit_Outlet_Status: {},
        Edit_Configuration: {},
        Full_access: {},
      },
    }); // Reset the new role state
  };

  const handleAddNewRole = () => {
    onAdd(newRole);
    handleCloseAddDialog();
  };

  const handleChangeNewRole = (key, value) => {
    setNewRole((prevNewRole) => ({
      ...prevNewRole,
      [key]: value,
    }));
  };

  const handleEditRole = (key, value) => {
    setEditedRole((prevEditedRole) => ({
      ...prevEditedRole,
      [key]: value,
    }));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Role Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role, index) => (
              <TableRow key={role.name}>
                <TableCell align="center">{role.name}</TableCell>
                <TableCell align="center">{role.description}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Permissions">
                    <IconButton onClick={() => handleOpenDialog(role)}>
                      <MdOutlineAddModerator />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Role">
                    <IconButton onClick={() => handleEditRoleDialog(role, "edit")}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Role">
                    <IconButton onClick={() => onDelete(role.name)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddDialog}
        style={{ margin: "10px 0" }}
      >
        Add Role
      </Button>
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Role Name"
            type="text"
            fullWidth
            value={newRole.name}
            onChange={(e) => handleChangeNewRole("name", e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Role Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newRole.description}
            onChange={(e) => handleChangeNewRole("description", e.target.value)}
          />
          <Typography
            variant="caption"
            style={{ marginTop: "10px", placeContent: "center", display: "flex", textAlign: "center" }}
          >
            Permissions will be set after adding the role. <br></br> Please click on the 'Edit Permissions' button in
            actions to set permissions for this role.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddNewRole}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseAddDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Role Name"
            type="text"
            fullWidth
            value={editedRole.name}
            onChange={(e) => handleEditRole("name", e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Role Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedRole.description}
            onChange={(e) => handleEditRole("description", e.target.value)}
          />
          <Typography
            variant="caption"
            style={{ marginTop: "10px", placeContent: "center", display: "flex", textAlign: "center" }}
          >
            Please click on the 'Edit Permissions' button in actions to edit permissions for this role.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button
            onClick={() => {
              onEdit(editedRole); // Implement this function to save the changes
              handleCloseAddDialog();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Role Permissions</DialogTitle>
        <DialogContent>
          {editedRole && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task</TableCell>
                    {Array.from({ length: 8 }, (_, i) => (
                      <TableCell key={`PDU ${i + 1}`}>PDU {i + 1}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(editedRole.permissions).map((task) => (
                    <TableRow key={task}>
                      <TableCell>{task}</TableCell>
                      {Array.from({ length: 8 }, (_, i) => {
                        const pdu = `PDU${i + 1}`;
                        return (
                          <TableCell key={pdu}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={editedRole.permissions[task][pdu] || false}
                                  onChange={(event) => handleCheckboxChange(task, pdu, event.target.checked)}
                                />
                              }
                              label=""
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              onEdit(editedRole); // Implement this function to save the changes
              handleCloseDialog();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function AccessControlTableIPv4() {
  // Services options
  const servicesOptions = ["All", "webaccess/api", "snmp", "ssh", "syslog", "modbus"];

  // Initial form state
  const initialFormState = {
    name: "",
    network: "",
    netmask: "",
    service: "",
    metric: "",
    action: "allow",
  };

  // Default row
  const defaultRow = {
    name: "Default Rule",
    network: "::/0",
    service: "All",
    netmask: "0.0.0.0",
    metric: "255",
    action: "deny",
  };

  const [rows, setRows] = useState([defaultRow]); // Initialize with default row
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingIndex, setEditingIndex] = useState(-1); // Track editing row index

  const handleClickOpen = (index = -1) => {
    if (index > -1) {
      // Modify existing row
      setFormData(rows[index]);
      setEditingIndex(index);
    } else {
      // Add new row
      setFormData(initialFormState);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIndex(-1);
  };

  const handleAdd = () => {
    if (editingIndex > -1) {
      // Update existing row
      const updatedRows = [...rows];
      updatedRows[editingIndex] = formData;
      setRows(updatedRows);
      setEditingIndex(-1);
    } else {
      // Add new row
      setRows([...rows, formData]);
    }
    handleClose();
  };

  const handleDelete = (index) => {
    const updatedRows = rows.filter((_, idx) => idx !== index);
    setRows(updatedRows);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Access Rule
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingIndex > -1 ? "Edit" : "Add New"} Access Rule</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="network"
            label="Network"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.network}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="netmask"
            label="Netmask"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.netmask}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            name="service"
            label="Service"
            fullWidth
            variant="outlined"
            value={formData.service}
            onChange={handleChange}
          >
            {servicesOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="metric"
            label="Metric"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.metric}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            name="action"
            label="Action"
            fullWidth
            variant="outlined"
            value={formData.action}
            onChange={handleChange}
          >
            <MenuItem value="allow">Allow</MenuItem>
            <MenuItem value="deny">Deny</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>{editingIndex > -1 ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Network</TableCell>
              <TableCell>Netmask</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Metric</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.network}</TableCell>
                <TableCell>{row.netmask}</TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.metric}</TableCell>
                <TableCell>{row.action}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function AccessControlTableIPv6() {
  // Services options
  const servicesOptions = ["All", "webaccess/api", "snmp", "ssh", "syslog", "modbus"];

  // Initial form state
  const initialFormState = {
    name: "",
    network: "",
    service: "",
    metric: "",
    action: "allow",
  };

  // Default row
  const defaultRow = {
    name: "Default Rule",
    network: "::/0",
    service: "All",
    metric: "255",
    action: "deny",
  };

  const [rows, setRows] = useState([defaultRow]); // Initialize with default row
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingIndex, setEditingIndex] = useState(-1); // Track editing row index

  const handleClickOpen = (index = -1) => {
    if (index > -1) {
      // Modify existing row
      setFormData(rows[index]);
      setEditingIndex(index);
    } else {
      // Add new row
      setFormData(initialFormState);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIndex(-1);
  };

  const handleAdd = () => {
    if (editingIndex > -1) {
      // Update existing row
      const updatedRows = [...rows];
      updatedRows[editingIndex] = formData;
      setRows(updatedRows);
      setEditingIndex(-1);
    } else {
      // Add new row
      setRows([...rows, formData]);
    }
    handleClose();
  };

  const handleDelete = (index) => {
    const updatedRows = rows.filter((_, idx) => idx !== index);
    setRows(updatedRows);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Access Rule
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingIndex > -1 ? "Edit" : "Add New"} Access Rule</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="network"
            label="Network"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.network}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            name="service"
            label="Service"
            fullWidth
            variant="outlined"
            value={formData.service}
            onChange={handleChange}
          >
            {servicesOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="metric"
            label="Metric"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.metric}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            name="action"
            label="Action"
            fullWidth
            variant="outlined"
            value={formData.action}
            onChange={handleChange}
          >
            <MenuItem value="allow">Allow</MenuItem>
            <MenuItem value="deny">Deny</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>{editingIndex > -1 ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Network</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Metric</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.network}</TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.metric}</TableCell>
                <TableCell>{row.action}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

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
  const [authenticationType, setAuthenticationType] = React.useState("");

  const handleChange = (event) => {
    setAuthenticationType(event.target.value);
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
            <InputLabel id="demo-select-small-label">Authentication Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={authenticationType}
              label="Authentication Type"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Local"}>Local</MenuItem>
              <MenuItem value={"Local + LDAP / Active Directory"}>Local + LDAP / Active Directory</MenuItem>
              <MenuItem value={"Local + Radius"}>Local + Radius</MenuItem>
              <MenuItem value={"Local + Tacacs+"}>Local + Tacacs+</MenuItem>
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
  const [blockUser, setBlockUser] = useState(true);
  const [passwordAging, setPasswordAging] = useState(false);
  const [strongPasswords, setStrongPasswords] = useState(false);

  return (
    <Box sx={{ width: "90%", display: "flex", margin: "auto", placeContent: "center" }}>
      <FormGroup
        sx={{ width: "100%", display: "flex", flexDirection: "column", margin: "auto", placeContent: "center" }}
      >
        <h2>Session Timeout</h2>
        <TextField label="Session timeout period" defaultValue="1 day" margin="normal" fullWidth />
        <FormControlLabel control={<Checkbox />} label="Prevent concurrent login with same username" />

        <h2>Login Security</h2>
        <FormControlLabel
          control={<Checkbox checked={blockUser} onChange={() => setBlockUser(!blockUser)} />}
          label="Block user on login failure"
        />
        {blockUser && (
          <>
            <TextField label="Block timeout" defaultValue="10 min" margin="normal" fullWidth />
            <TextField label="Maximum number of failed logins" defaultValue="3" margin="normal" fullWidth />
            <TextField label="Timeout for failed login attempts" defaultValue="10 min" margin="normal" fullWidth />
          </>
        )}
        <FormControlLabel control={<Checkbox />} label="Exclude ADMIN USER" />
        <Box display="flex" justifyContent="end" mt={2}>
          <Button variant="contained" color="primary">
            Save
          </Button>
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
  // LDAP entries without groupsOU and usersOU fields
  const [ldapEntries, setLdapEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  // Global settings for groupsOU and usersOU
  const [globalOU, setGlobalOU] = useState({ groupsOU: "", usersOU: "" });

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const handleDeleteEntry = () => {
    setLdapEntries(ldapEntries.filter((entry) => entry !== selectedEntry));
    setSelectedEntry(null);
  };

  const handleTestConnection = () => {
    console.log("Testing connection for:", selectedEntry);
  };

  const handleSave = () => {
    console.log("Saving LDAP settings:", ldapEntries, globalOU);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
  }));

  return (
    <>
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
                  { order: ldapEntries.length + 1, ip: "", port: "", security: "", type: "" },
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
        </div>
      </TableContainer>
      <TextField
        fullWidth
        label="Global Users OU"
        variant="outlined"
        size="small"
        value={globalOU.usersOU}
        onChange={(e) => setGlobalOU({ ...globalOU, usersOU: e.target.value })}
        helperText="Example Syntax: DC=local,DC=powertek,OU=users,OU=pdu"
        sx={{ marginTop: "12px" }}
      />
      <TextField
        fullWidth
        label="Global Groups OU"
        variant="outlined"
        size="small"
        value={globalOU.groupsOU}
        onChange={(e) => setGlobalOU({ ...globalOU, groupsOU: e.target.value })}
        helperText="Example Syntax: DC=local,DC=powertek,OU=users,OU=pdu"
        sx={{ marginTop: "12px" }}
      />
      <Box display="flex" justifyContent="end" mt={2}>
        <MuiButton variant="contained" color="primary">
          Save
        </MuiButton>
      </Box>
    </>
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
  const roles_data = [
    {
      name: "Admin",
      description: "Administrator role with full permissions",
      permissions: {
        Only_Read: { PDU1: true, PDU2: false },
        Edit_Threshold: { PDU1: true, PDU2: true },
        Edit_Outlet_Status: {},
        Edit_Configuration: {},
        Full_access: {},
        // ... other tasks and PDUs
      },
    },
    // ... other roles
  ];

  const [roles, setRoles] = useState(roles_data);

  const handleDeleteRole = (roleName) => {
    // Implement deletion logic
    setRoles((prevRoles) => prevRoles.filter((role) => role.name !== roleName));
    console.log("Deleted role:", roleName);
  };

  const handleEdit = (newRole) => {
    // Logic to handle edit action
    setRoles((prevRoles) => {
      const index = prevRoles.findIndex((role) => role.name === newRole.name);
      if (index >= 0) {
        prevRoles[index] = newRole;
      }
      return [...prevRoles];
    });

    console.log("Edit role at index:", newRole);
  };

  const handleAddRole = (newRole) => {
    // Here you would add the new role to your state or backend
    // For example, if using useState:
    setRoles((prevRoles) => [...prevRoles, newRole]);
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Security">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="IP Access Control">
                  <CollapsiableNamedContainer title="IPv4">
                    <AccessControlTableIPv4 />
                  </CollapsiableNamedContainer>
                  <CollapsiableNamedContainer title="IPv6">
                    <AccessControlTableIPv6 />
                  </CollapsiableNamedContainer>
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Role Based Access Control">
                  <RoleACL roles={roles} onEdit={handleEdit} onAdd={handleAddRole} onDelete={handleDeleteRole} />
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
              {/* <Grid item xs={12}>
                <CollapsiableNamedContainer title="Manage PDU">
                  <ManagePDUs />
                </CollapsiableNamedContainer>
              </Grid> */}
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Security;
