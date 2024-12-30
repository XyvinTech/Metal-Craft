import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import image from "../assets/images/logo.png";
import logo from "../assets/images/metal.png";
import Icon from "@mdi/react";
import {
  mdiCogOutline,
  mdiFolderOutline,
  mdiLogout,
  mdiMenu,
  mdiViewDashboardOutline,
} from "@mdi/js";
import { useAdminStore } from "../store/adminStore";
const drawerWidth = 250;
const subNavigation = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <Icon path={mdiViewDashboardOutline} />,
  },
  { name: "Projects", to: "/project", icon: <Icon path={mdiFolderOutline} /> },

  { name: "Settings", to: "/settings", icon: <Icon path={mdiCogOutline} /> },
];

const Layout = (props) => {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { singleAdmin ,fetchAdminById} = useAdminStore();
  const location = useLocation();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  useEffect(() => {
    fetchAdminById();
  }, []);
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("4ZbQwXtY8uVrN5mP7kL3JhD6");
    navigate("/");
  };
  const drawer = (
    <div style={{ position: "relative", height: "100%" }}>
      <Toolbar
        sx={{
          height: "118px",
          justifyContent: "center",
        }}
      >
        <Stack justifyContent={"center"} spacing={2}>
          <img src={logo} alt="Logos" width={"58px"} height="58px" />
        </Stack>
      </Toolbar>
      <List
        sx={{
          height: "calc(100% - 150px)", 
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: 0,
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#a1a1a1",
            },
          },
        }}
      >
        {subNavigation.map((item) => (
          <ListItem
            sx={{ paddingBottom: "20px" }}
            key={item.name}
            disablePadding
          >
            <ListItemButton
              component={Link}
              to={item.to}
              sx={{
                fontWeight: location.pathname.startsWith(item.to)
                  ? "bold"
                  : "normal",
                color: location.pathname.startsWith(item.to)
                  ? "#042F61"
                  : "#4E4E4E",
                backgroundColor: location.pathname.startsWith(item.to)
                  ? "rgba(4, 47, 97, 0.1)"
                  : "transparent",
                "&:hover": {
                  color: "#042F61",
                  backgroundColor: "rgba(4, 47, 97, 0.1)",
                },
                "&:hover .MuiListItemIcon-root": { color: "#042F61" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 24,
                  marginLeft: 1,
                  marginRight: 1,
                  color: location.pathname === item.to ? "#042F61" : "#4E4E4E",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: "h7" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* Logout and Poww Section */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
        }}
      >
        <List
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "8px",
            paddingLeft: "20px",
            color: "#B3261E",
            
          }}
          onClick={handleLogout}
        >
          <Icon path={mdiLogout} size={1} />
          <Typography sx={{ cursor: "pointer" }}>Logout</Typography>
        </List>

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 2,
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Typography variant="h8" sx={{ cursor: "pointer" }} color="#A8A8A8">
            Powered by
          </Typography>
          <img src={image} width={"60px"} height={"60px"} alt="Logo" />
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: `white`,
          boxShadow: `none`,
        }}
      >
        <Toolbar
          sx={{
            height: "auto",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "flex-start",
              padding: "15px",
            }}
          >
            <IconButton
              color="#000"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Icon path={mdiMenu} />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }} p={1}>
            <Box
              borderRadius="6px"
              padding={"5px 20px 5px 5px"}
              bgcolor={"#F7F7F7"}
              width={"200px"}
              color={"#000"}
              gap={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ flexShrink: 0, marginLeft: "10px" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginLeft: "10px" }}>
                  <Typography variant="h7" color={"#292D32"} display="block">
                    {singleAdmin?.name}
                  </Typography>
                  <Typography
                    variant="h7"
                    color={"rgba(41, 45, 50, 0.44)"}
                    display="block"
                  >
                    Admin
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "#F3F3F3",
          // paddingTop: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>{" "}
    </Box>
  );
};

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
