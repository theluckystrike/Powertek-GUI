import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const pageStyles = {
  toolbar: {
    minHeight: "80px !important",
    margin: "0 auto",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: "0px !important",
  },
};

export default function Sidebar() {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar sx={pageStyles.toolbar}>
          <Link to="/">
            <img src="../../logo.svg" alt="Lilly Logo" />
          </Link>
        </Toolbar>
        <Box sx={{ overflow: "None" }}>
          <List>
            <ListItem key="new_pred" disablePadding>
              <ListItemButton component={Link} to="/new-submit">
                <ListItemText> Submit A New Prediction</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key="view_res" disablePadding>
              <ListItemButton component={Link} to="/workflow">
                <ListItemText> Workflows</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
