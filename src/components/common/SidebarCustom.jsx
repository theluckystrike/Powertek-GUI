import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { RiOutlet2Fill } from "react-icons/ri";
import { FaObjectUngroup } from "react-icons/fa6";
import { VscServerEnvironment } from "react-icons/vsc";
import { IoSettings } from "react-icons/io5";
import { RiListSettingsLine } from "react-icons/ri";
import { GrHostMaintenance } from "react-icons/gr";
import { IoMdAnalytics } from "react-icons/io";

import ConfigContext from "./ConfigContext";
import logo from "../../assets/logo-clear.png";

function SidebarCustom(props) {
  const config = useContext(ConfigContext);
  const logoName = config[`logoName`];
  const imageurl = new URL(`../../assets/${logoName}`, import.meta.url).href;
  const { collapsed, setsideBarCollapsed } = props;
  const menuItemStyles = {
    button: {
      // [`&.${menuClasses.disabled}`]: {
      //   color: themes[theme].menu.disabled.color,
      // },
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        color: "#CDCDCD",
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={collapsed}
      onBackdropClick={() => setToggled(!collapsed)}
      backgroundColor="#203246"
      iconColor="#e3e3e3"
      rootStyles={{
        color: "#e3e3e3",
        borderRight: "0px",
      }}
      breakPoint="md"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100vh",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "15px" }}>
          <Box
            component="img"
            sx={{
              width: "100%",
              objectFit: "cover",
              overflow: "hidden",
            }}
            alt="Logo"
            src={imageurl}
          />
        </div>
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem icon={<LabelImportantIcon />} component={<Link to="/" />}>
            Summary Overview
          </MenuItem>
          <MenuItem icon={<VerticalAlignBottomIcon />} component={<Link to="/inlet" />}>
            Inlet
          </MenuItem>
          <MenuItem icon={<OfflineBoltIcon />} component={<Link to="/breaker-overcurrent-protection" />}>
            Breaker Overcurrent Protection
          </MenuItem>

          <MenuItem icon={<RiOutlet2Fill size={23} />} component={<Link to="/outlet" />}>
            Outlet
          </MenuItem>

          <MenuItem icon={<FaObjectUngroup size={23} />} component={<Link to="/outlet-grouping" />}>
            Outlet Grouping
          </MenuItem>

          <MenuItem icon={<VscServerEnvironment size={23} />} component={<Link to="/environment-sensor" />}>
            Environment Sensor
          </MenuItem>

          <MenuItem icon={<IoSettings size={23} />} component={<Link to="/user-settings" />}>
            User Settings
          </MenuItem>

          <MenuItem icon={<RiListSettingsLine size={23} />} component={<Link to="/device-settings" />}>
            Device Settings
          </MenuItem>

          <MenuItem icon={<GrHostMaintenance size={23} />} component={<Link to="/maintenance" />}>
            Maintenance
          </MenuItem>

          <MenuItem icon={<IoMdAnalytics size={23} />} component={<Link to="/powertek-analytics" />}>
            Powertek Analytics
          </MenuItem>
        </Menu>
        <Box sx={{ flexGrow: "1" }} />
        <Button size="large" color="inherit" onClick={() => setsideBarCollapsed(!collapsed)}>
          <MenuIcon />
        </Button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
          <Typography variant="caption" color="#fff">
            © 2023
          </Typography>
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarCustom;
