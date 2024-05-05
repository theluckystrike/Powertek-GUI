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
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit User - webdemo</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 0.5 }} />
        <NamedContainer title="User Information">
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="User name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField margin="dense" id="fullname" label="Full name" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="password" label="Password" type="password" fullWidth variant="outlined" />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField margin="dense" id="telephone" label="Telephone number" type="tel" fullWidth variant="outlined" />
          <TextField margin="dense" id="email" label="Email address" type="email" fullWidth variant="outlined" />
          <FormControlLabel control={<Checkbox checked={true} name="enable" />} label="Enable" />
          <FormControlLabel
            control={<Checkbox checked={false} name="forceChange" />}
            label="Force password change on next login"
          />
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
        <Button onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

function UserSetting() {
  const [userList, setUserList] = useState(userListGlobal);
  const [checked, setChecked] = useState(null);
  const [settingsEdit, setsettingsEdit] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    if (checked) {
      setDialogOpen(true);
    } else {
      alert("Please select a user to edit");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCheckboxChange = (id) => {
    if (checked && checked.id === id) {
      setChecked(null);
    } else {
      userList.forEach((user) => {
        if (user.id === id) {
          setChecked(user);
        }
      });
    }
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

  const deleteUser = () => {
    if (checked == null) {
      alert("Please select a user to delete");
      return;
    } else {
      const userListCopy = [...userList];
      userListCopy.forEach((user) => {
        if (user.id === checked.id) {
          user.delete = true;
        }
      });
      setUserList(userListCopy);
    }
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
              <IconButton size="small" sx={{ fontSize: "24px" }} onClick={deleteUser}>
                <MdDelete />
              </IconButton>
              <IconButton size="small" sx={{ fontSize: "24px" }} onClick={handleDialogOpen}>
                <MdEdit />
              </IconButton>
              <IconButton
                value="settingsEdit"
                selected={settingsEdit}
                onClick={() => setsettingsEdit(!settingsEdit)}
                sx={{
                  fontSize: "20px",
                }}
                size="small"
              >
                {settingsEdit ? <FaLockOpen color="red" /> : <FaLock color="#FFD700" />}
              </IconButton>
            </div>
          </div>
        }
      >
        <TableContainer>
          <Table aria-label="PDU table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Select</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Full Name</StyledTableCell>
                <StyledTableCell align="center">Roles</StyledTableCell>
                <StyledTableCell align="center">Enabled/Disabled</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .filter((user) => !user.delete)
                .map((_, index) => (
                  <TableRow key={index}>
                    <StyledTableCell padding="checkbox" align="center">
                      {!_.isAdmin ? (
                        <Checkbox checked={checked && checked.id == _.id} onChange={() => handleCheckboxChange(_.id)} />
                      ) : settingsEdit ? (
                        <Checkbox checked={checked && checked.id == _.id} onChange={() => handleCheckboxChange(_.id)} />
                      ) : (
                        <FaLock />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">{_.username}</StyledTableCell>
                    <StyledTableCell align="center">{_.fullName}</StyledTableCell>
                    <StyledTableCell align="center">{_.roles}</StyledTableCell>
                    <StyledTableCell padding="checkbox" align="center">
                      <Checkbox checked={_.Enabled} onChange={() => toggleUser(_.id)} />
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </NamedContainer>
      <UserDialog open={isDialogOpen} onClose={handleDialogClose} />
    </Box>
  );
}

export default UserSetting;
