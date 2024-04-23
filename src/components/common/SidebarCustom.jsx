import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
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

import ConfigContext, { UIConfigContext } from "./ConfigContext";
import logo from "../../assets/logo-clear.png";
import { useTheme } from "@emotion/react";

function SidebarCustom(props) {
  const theme = useTheme();
  const { UIConfig, setUIConfig } = useContext(UIConfigContext);
  const logoName = UIConfig[`logoName`];
  const imageurl = new URL(`../../assets/${logoName}`, import.meta.url).href;
  const { collapsed, setsideBarCollapsed, sideBarToggle, setsideBarToggle } = props;
  const menuItemStyles = {
    button: {
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        color: "#CDCDCD",
      },
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? "#203246" : "transparent",
    }),
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={sideBarToggle}
      onBackdropClick={() => setsideBarToggle(!sideBarToggle)}
      backgroundColor="#203246"
      iconColor="#e3e3e3"
      style={{ zIndex: 1111 }}
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
              width: "auto",
              objectFit: "cover",
              overflow: "hidden",
              cursor: "pointer",
              maxHeight: "60px",
            }}
            alt="Logo"
            src={imageurl}
            onClick={() => {
              window.open(UIConfig.companyUrl, "_blank");
            }}
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

          <SubMenu label="Device Settings" icon={<RiListSettingsLine size={23} />}>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/device-settings/network" />}>
              Network
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/device-settings/networkServices" />}>
              Network Services
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/device-settings/security" />}>
              Security
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/device-settings/datetime" />}>
              Date/Time
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/device-settings/eventlogs" />}>
              Event Logs
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/device-settings/data-logging" />}>
              Data Logging
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/device-settings/usb-host-port" />}>
              USB Host Ports
            </MenuItem>
            {/* <MenuItem style={{paddingLeft: '65px'}} component={<Link to="/device-settings" />}>Server Reachability</MenuItem>
            <MenuItem style={{paddingLeft: '65px'}} component={<Link to="/device-settings" />}>Front Panel</MenuItem>
            <MenuItem style={{paddingLeft: '65px'}} component={<Link to="/device-settings" />}>Lua Scripts</MenuItem>
            <MenuItem style={{paddingLeft: '65px'}} component={<Link to="/device-settings" />}>Miscellaneous</MenuItem> */}
          </SubMenu>

          <SubMenu label="Maintenance" icon={<GrHostMaintenance size={23} />}>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/maintenance/pdu-information" />}>
              PDU Information
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/maintenance/firmware-update" />}>
              Firmware Update
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/maintenance/bulk-configuration" />}>
              Bulk Configuration
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/maintenance/backup" />}>
              Backup
            </MenuItem>
            <MenuItem style={{ paddingLeft: "65px" }} component={<Link to="/maintenance/reset-restore" />}>
              Reset/Restore
            </MenuItem>
          </SubMenu>
          {/* <MenuItem icon={<GrHostMaintenance size={23} />} component={<Link to="/maintenance" />}>
            Maintenance
          </MenuItem> */}

          <MenuItem icon={<IoMdAnalytics size={23} />} component={<Link to="/powertek-analytics" />}>
            Powertek Analytics
          </MenuItem>
        </Menu>
        <Box sx={{ flexGrow: "1" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle2" color="#fff">
            Last Login: {new Date().toLocaleString()}
          </Typography>
        </div>

        {/* <Button size="large" color="inherit" onClick={() => setsideBarCollapsed(!collapsed)}>
          <MenuIcon />
        </Button> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
            flexDirection: "column",
          }}
        >
          <Typography variant="caption" color="#fff">
            Model: {UIConfig[`model`]}
          </Typography>
          <Typography variant="caption" color="#fff">
            Firmware version: {UIConfig[`firmwareVersion`]}
          </Typography>
          <Typography variant="caption" color="#fff">
            Help:{" "}
            <Link style={{ color: "orange" }} to="/help">
              Online Documentation
            </Link>
          </Typography>
          <Typography variant="caption" color="#fff">
            © 2023
          </Typography>
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarCustom;
