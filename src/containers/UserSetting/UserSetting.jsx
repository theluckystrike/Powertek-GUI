import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  // Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Button,
  MenuItem,
} from "@mui/material";
import Dialog from "../../components/common/DialogWithClose";
import NamedContainer from "../../components/common/NamedContainer";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import styled from "@emotion/styled";

const userListGlobal = [
  { id: 1, username: "User1", fullName: "David", roles: "Engineer", Enabled: false, delete: false },
  { id: 2, username: "User2", fullName: "Jane Doe", roles: "Breaker", Enabled: true, delete: false },
  { id: 3, username: "Admin", fullName: "James", roles: "Maintainer", Enabled: true, isAdmin: true, delete: false },
];

function UserDialog(props) {
  const { open, onClose, user } = props;
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Save the changes
    onClose();
  };

  const renewApiKey = () => {
    // Logic to renew API Key
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit User - {user.username}</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 0.5 }} />
        <NamedContainer title="User Information">
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="User name"
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            disabled={user.isAdmin}
          />
          <TextField
            margin="dense"
            id="fullname"
            label="Full name"
            name="fullName"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm password"
            name="confirmPassword"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="telephone"
            label="Telephone number"
            name="telephone"
            type="tel"
            fullWidth
            variant="outlined"
            value={formData.telephone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email address"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox checked={formData.Enabled} name="Enabled" onChange={handleChange} />}
            label="Enable"
            disabled={user.isAdmin}
          />
          <FormControlLabel
            control={<Checkbox checked={formData.forceChange} name="forceChange" onChange={handleChange} />}
            label="Force password change on next login"
          />
        </NamedContainer>
        <Box sx={{ p: 0.5 }} />
        <NamedContainer title="API Key">
          <TextField
            margin="dense"
            name="apiKey"
            label="API Key"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.apiKey}
            onChange={handleChange}
            disabled
          />
          <Button onClick={renewApiKey}>Renew API Key</Button>
        </NamedContainer>
        <Box sx={{ p: 0.5 }} />
        <NamedContainer title="RBAC">
          <TextField
            select
            fullWidth
            margin="dense"
            label="RBAC"
            name="rbac"
            value={formData.rbac}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="role1">Role 1</MenuItem>
            <MenuItem value="role2">Role 2</MenuItem>
            {/* Add more roles as needed */}
          </TextField>
        </NamedContainer>
        <Box sx={{ p: 0.5 }} />
        <NamedContainer title="SSH Key">
          <TextField
            margin="dense"
            name="sshKey"
            label="SSH public key"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.sshKey}
            onChange={handleChange}
          />
        </NamedContainer>
        <Box sx={{ p: 0.5 }} />
        <NamedContainer title="SNMPv3">
          <FormControlLabel control={<Checkbox />} label="Enable SNMPv3" />
          <TextField select fullWidth margin="dense" label="Security level" defaultValue="" variant="outlined">
            <MenuItem value="auth">Authentication</MenuItem>
            <MenuItem value="authPriv">Authentication & Privacy</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="dense"
            label="Authentication password"
            type="password"
            variant="outlined"
            placeholder="Password"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Confirm password"
            type="password"
            variant="outlined"
            placeholder="Confirm Password"
          />
          <FormControlLabel control={<Checkbox />} label="Same as user password" />
          <TextField
            fullWidth
            margin="dense"
            label="Privacy password"
            type="password"
            variant="outlined"
            placeholder="Password"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Confirm password"
            type="password"
            variant="outlined"
            placeholder="Confirm Password"
          />
          <FormControlLabel control={<Checkbox />} label="Same as authentication password" />
          <TextField
            select
            fullWidth
            margin="dense"
            label="Authentication Protocol"
            defaultValue="SHA-1"
            variant="outlined"
          >
            <MenuItem value="SHA-1">SHA-1</MenuItem>
            <MenuItem value="MD5">MD5</MenuItem>
          </TextField>
          <TextField select fullWidth margin="dense" label="Privacy Protocol" defaultValue="AES-128" variant="outlined">
            <MenuItem value="AES-128">AES-128</MenuItem>
            <MenuItem value="DES">DES</MenuItem>
          </TextField>
        </NamedContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

function UserSetting() {
  const [userList, setUserList] = useState(userListGlobal);
  const [checked, setChecked] = useState(null);
  const [settingsEdit, setsettingsEdit] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = (user) => {
    setChecked(user);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const toggleUser = (id) => {
    const userListCopy = [...userList];
    userListCopy.forEach((user) => {
      if (user.id === id) {
        user.Enabled = !user.Enabled;
      }
    });
    setUserList(userListCopy);
  };

  const deleteUser = (id) => {
    const userListCopy = [...userList];
    const updatedList = userListCopy.filter((user) => user.id !== id);
    setUserList(updatedList);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
  }));

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <NamedContainer
        overridetitle
        title={
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="600">
              USERS
            </Typography>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <IconButton size="small" sx={{ fontSize: "24px" }}>
                <HiUserAdd />
              </IconButton>
            </div>
          </div>
        }
      >
        <TableContainer>
          <Table aria-label="PDU table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Full Name</StyledTableCell>
                <StyledTableCell align="center">RBAC</StyledTableCell>
                <StyledTableCell align="center">Enabled/Disabled</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .filter((user) => !user.delete)
                .map((user) => (
                  <TableRow key={user.id}>
                    <StyledTableCell align="center">{user.username}</StyledTableCell>
                    <StyledTableCell align="center">{user.fullName}</StyledTableCell>
                    <StyledTableCell align="center">{user.roles}</StyledTableCell>
                    <StyledTableCell padding="checkbox" align="center">
                      <Checkbox checked={user.Enabled} onChange={() => toggleUser(user.id)} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton size="small" sx={{ fontSize: "24px" }} onClick={() => handleDialogOpen(user)}>
                        <MdEdit />
                      </IconButton>
                      <IconButton size="small" sx={{ fontSize: "24px" }} onClick={() => deleteUser(user.id)}>
                        <MdDelete />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </NamedContainer>
      {checked && <UserDialog open={isDialogOpen} onClose={handleDialogClose} user={checked} />}
    </Box>
  );
}

export default UserSetting;
