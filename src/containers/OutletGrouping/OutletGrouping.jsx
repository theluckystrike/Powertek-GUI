import React, { useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
} from "@mui/material";
import NamedContainer, { CollapsiableNamedContainer } from "../../components/common/NamedContainer";
import PduSelect from "../../components/common/PDUSelect";
import MuiButton from "../../components/common/styled/Button";

function AddOutletGroupDialog({ open, onClose, group, groups, setGropus }) {
  const [checked, setChecked] = React.useState(group.checked || {});
  const [pduChecked, setPduChecked] = React.useState(group.pduChecked || {});
  const [groupName, setGroupName] = useState(group.name || "");

  const handleGroupnameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const handlePduChange = (event) => {
    setPduChecked({ ...pduChecked, [event.target.name]: event.target.checked });
  };

  const handleSave = () => {
    const newGroup = {
      name: groupName,
      outlets: checked,
      pdus: pduChecked,
    };
    setGropus([...groups, newGroup]);
    // console.log(groups);
    onClose();
  };

  const pdus = Array.from({ length: 16 }, (_, i) => ({
    name: `PDU ${i + 1}`,
    checked: pduChecked[`PDU${i + 1}`] || false,
  }));

  const outlets = Array.from({ length: 40 }, (_, i) => ({
    name: `Outlet ${i + 1}`,
    checked: checked[`Outlet${i + 1}`] || false,
  }));

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
                      {pdus.map((pdu, index) => (
                        <div key={pdu.name} style={{ flex: "0 0 auto", padding: 8, margin: "auto" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={pdu.checked}
                                onChange={handlePduChange}
                                name={`PDU${index + 1}`}
                              />
                            }
                            label={pdu.name}
                          />
                        </div>
                      ))}
                    </div>
                  </Grid>
                </Grid>
                <Grid item container spacing={0} sx={{ margin: "auto" }}>
                  {outlets.map((outlet, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      key={outlet.name}
                      sx={{ padding: "0", margin: "auto", display: "flex", placeContent: "center" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{ margin: "auto" }}
                            size="small"
                            checked={outlet.checked}
                            onChange={handleChange}
                            name={`Outlet${index + 1}`}
                          />
                        }
                        label={outlet.name}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid item container justifyContent="center" xs={12} sx={{ marginTop: "20px" }}>
                  <MuiButton variant="contained" color="primary" onClick={handleSave} sx={{ marginRight : "4px"}}>
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

function EditOutletGroupDialog({ open, onClose, group, groups, setGropus }) {
  // console.log(group);
  const [checked, setChecked] = React.useState(group.outlets || {});
  const [pduChecked, setPduChecked] = React.useState(group.pdus || {});
  const [groupName, setGroupName] = useState(group.name || "");

  const handleGroupnameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const handlePduChange = (event) => {
    setPduChecked({ ...pduChecked, [event.target.name]: event.target.checked });
  };

  const handleSave = () => {
    const newGroup = {
      name: groupName,
      outlets: checked,
      pdus: pduChecked,
    };
    const newGroups = groups.map((g) => (g.name === group.name ? newGroup : g));
    setGropus(newGroups);
    onClose();
  };

  const pdus = Array.from({ length: 16 }, (_, i) => ({
    name: `PDU ${i + 1}`,
    checked: pduChecked[`PDU${i + 1}`] || false,
  }));

  const outlets = Array.from({ length: 40 }, (_, i) => ({
    name: `Outlet ${i + 1}`,
    checked: checked[`Outlet${i + 1}`] || false,
  }));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
      <Box sx={{ p: 4 }}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="600">
              Edit Outlet Group
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
                      {pdus.map((pdu, index) => (
                        <div key={pdu.name} style={{ flex: "0 0 auto", padding: 8, margin: "auto" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={pdu.checked}
                                onChange={handlePduChange}
                                name={`PDU${index + 1}`}
                              />
                            }
                            label={pdu.name}
                          />
                        </div>
                      ))}
                    </div>
                  </Grid>
                </Grid>
                <Grid item container spacing={0} sx={{ margin: "auto" }}>
                  {outlets.map((outlet, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      key={outlet.name}
                      sx={{ padding: "0", margin: "auto", display: "flex", placeContent: "center" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{ margin: "auto" }}
                            size="small"
                            checked={outlet.checked}
                            onChange={handleChange}
                            name={`Outlet${index + 1}`}
                          />
                        }
                        label={outlet.name}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid item container justifyContent="center" xs={12} sx={{ marginTop: "20px" }}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="contained" color="secondary" style={{ marginLeft: 8 }} onClick={onClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

function OutletGrouping() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(true);
  const [editGroup, setEditGroup] = useState({}); // {name: "", outlets: {}, pdus: {}}
  const [groups, setGropus] = useState([]);

  const handleEdit = (group) => {
    setEditGroup(group);
    setEditDialogOpen(true);
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
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
                <Button variant="outlined" color="primary" size="small" onClick={() => setAddDialogOpen(true)}>
                  Add Outlet Group
                </Button>
              </div>
            }
          >
            {groups.length === 0 ? (
              <Typography variant="h2" sx={{ color: "#C3C3C3", margin: "auto" }}>
                No outlet group
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {groups.map((group) => (
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
                        onClick: () => handleEdit(group),
                      }}
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
      <AddOutletGroupDialog
        open={addDialogOpen}
        group={{}}
        onClose={() => setAddDialogOpen(false)}
        groups={groups}
        setGropus={setGropus}
      />
      {/* <EditOutletGroupDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        groups={groups}
        group={editGroup}
        setGropus={setGropus}
      /> */}
    </Box>
  );
}

export default OutletGrouping;
