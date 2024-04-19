import React, { useEffect, useState, useContext } from "react";

import {
  Box,
  Grid,
  Typography,
  Button,
  // Dialog,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Dialog from "../../components/common/DialogWithClose";
import NamedContainer, { CollapsiableNamedContainer } from "../../components/common/NamedContainer";
import PduSelect from "../../components/common/PDUSelect";
import MuiButton from "../../components/common/styled/Button";
import ConfigContext from "../../components/common/ConfigContext";

function OutletGroupDialog({ open, onClose, group, setGroupList, action, setDialog }) {
  const { config, setConfig } = useContext(ConfigContext);

  const [outlets, setOutlets] = useState({});
  const [pduChecked, setPduChecked] = React.useState({});
  const [groupName, setGroupName] = useState("");
  const [actionState, setActionState] = useState(action);

  useEffect(() => {
    if (action === "Edit" && group) {
      setGroupName(group.name);
      setOutlets(group.checkedOutlets);
      setPduChecked(group.pduChecked);
    }
  }, [group]);

  useEffect(() => {
    const tempOutlet = {};
    const tempPdu = {};
    for (let i = 0; i < config["outletNumber"]; i++) {
      tempOutlet[`Outlet ${i + 1}`] = false;
    }

    for (let i = 0; i < 16; i++) {
      tempPdu[`PDU ${i + 1}`] = false;
    }

    setOutlets(tempOutlet);
    setPduChecked(tempPdu);
  }, [config, actionState]);

  const handleGroupnameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleOutletChange = (event) => {
    setOutlets((prev) => {
      return { ...prev, [event.target.name]: event.target.checked };
    });
  };

  const handlePduChange = (event) => {
    setPduChecked((prev) => {
      return { ...prev, [event.target.name]: event.target.checked };
    });
  };

  const handleSave = () => {
    const newGroup = {
      name: groupName,
      checkedOutlets: outlets,
      pduChecked: pduChecked,
    };

    setGroupList((prev) => {
      const newGroupList = [...prev];
      for (let i = 0; i < newGroupList.length; i++) {
        if (newGroupList[i].name === groupName) {
          newGroupList[i] = newGroup;
          return newGroupList;
        }
      }
      newGroupList.push(newGroup);
      return newGroupList;
    });

    setGroupName("");
    const tempOutlet = {};
    const tempPdu = {};
    for (let i = 0; i < config["outletNumber"]; i++) {
      tempOutlet[`Outlet ${i + 1}`] = false;
    }

    for (let i = 0; i < 16; i++) {
      tempPdu[`PDU ${i + 1}`] = false;
    }

    setOutlets(tempOutlet);
    setPduChecked(tempPdu);

    setDialog(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
      <Box sx={{ p: 4 }}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="600">
              Add Outlet Group
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box style={{ padding: 8 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Group name"
                    variant="outlined"
                    placeholder="required"
                    size="small"
                    value={groupName}
                    onChange={handleGroupnameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={12} style={{ overflowX: "auto" }}>
                    <div style={{ display: "flex", width: "max-content" }}>
                      {Object.keys(pduChecked).map((pdu, index) => (
                        <div key={pdu} style={{ flex: "0 0 auto", padding: 8, margin: "auto" }}>
                          <FormControlLabel
                            control={
                              <Checkbox size="small" checked={pduChecked[pdu]} onChange={handlePduChange} name={pdu} />
                            }
                            label={pdu}
                          />
                        </div>
                      ))}
                    </div>
                  </Grid>
                </Grid>
                <Grid item container spacing={0} sx={{ margin: "auto" }}>
                  {Object.keys(outlets).map((outlet, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      key={outlet}
                      sx={{ padding: "0", margin: "auto", display: "flex", placeContent: "center" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{ margin: "auto" }}
                            size="small"
                            checked={outlets[outlet]}
                            onChange={handleOutletChange}
                            name={outlet}
                          />
                        }
                        label={outlet}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid item container justifyContent="center" xs={12} sx={{ marginTop: "20px" }}>
                  <MuiButton variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: "4px" }}>
                    Save
                  </MuiButton>
                  <MuiButton variant="contained" color="secondary" style={{ marginLeft: 8 }} onClick={onClose}>
                    Cancel
                  </MuiButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

function DeleteDialog({ open, onClose, setGroupList, groupList }) {
  const handleDelete = (index) => {
    // Remove the group from the list
    const updatedList = [...groupList];
    updatedList.splice(index, 1);
    setGroupList(updatedList);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
      <Box sx={{ p: 4 }}>
        <List>
          {groupList.map((group, index) => (
            <ListItem key={index}>
              <ListItemText primary={group.name} />
              <Button variant="contained" color="error" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}

function OutletGrouping() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [editGroup, setEditGroup] = useState(null);

  const handleEdit = (group) => {
    setEditGroup(group);
    setEditDialogOpen(true);
  };

  return (
    <>
      <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <NamedContainer
              overridetitle
              title={
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Typography variant="h5" fontWeight="600">
                    SETTINGS
                  </Typography>
                  <PduSelect />
                  <Box gap={2}>
                    {groupList.length !== 0 ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => {
                          setDeleteDialog(true);
                        }}
                        sx={{ marginRight: "8px" }}
                      >
                        Delete Group
                      </Button>
                    ) : null}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setAddDialogOpen(true);
                      }}
                    >
                      Add Outlet Group
                    </Button>
                  </Box>
                </div>
              }
            >
              {groupList.length === 0 ? (
                <Typography variant="h2" sx={{ color: "#C3C3C3", margin: "auto" }}>
                  No outlet group
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {groupList.map((group) => (
                    <Grid item xs={4} key={group.name}>
                      <Box
                        sx={{
                          p: 2,
                          border: "1px solid #C3C3C3",
                          borderRadius: "5px",
                          display: "flex",
                          placeContent: "center",
                          ":hover": {
                            cursor: "pointer",
                            backgroundColor: "#C3C3C3",
                          },
                        }}
                        onClick={() => handleEdit(group)}
                      >
                        <Typography variant="h5" fontWeight="600">
                          {group.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </NamedContainer>
          </Grid>
        </Grid>
      </Box>
      <OutletGroupDialog
        open={addDialogOpen}
        setDialog={setAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        setGroupList={setGroupList}
        action={"Add"}
      />
      <OutletGroupDialog
        open={editDialogOpen}
        setDialog={setEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        setGroupList={setGroupList}
        group={editGroup}
        action={"Edit"}
      />
      {groupList.length !== 0 ? (
        <DeleteDialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          setGroupList={setGroupList}
          groupList={groupList}
        />
      ) : null}
    </>
  );
}

export default OutletGrouping;
