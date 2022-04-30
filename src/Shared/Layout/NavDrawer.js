import React from "react";
import {
  Drawer,
  IconButton,
  ListItemButton,
  ListItemText,
  Paper,
  ListItemIcon,
  List,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import menuItems from "../../config/menuItems";
import PropTypes from "prop-types";
const NavDrawer = ({
  navDrawer,
  drawer,
  title,
  closeMenuButton,
  mobileOpen,
  setMobileOpen,
  drawerPaper,
  currentUserRole,
}) => {
  const theme = useTheme();
  const navigation = useNavigate();
  const location = useLocation();
  const filterMenuItems = () => {
    return currentUserRole
      ? menuItems.filter((item) => item.isAdmin)
      : menuItems.filter((item) => item.isUser);
  };
  return (
    <nav className={navDrawer}>
      <Paper
        sx={{ display: { xs: "block", sm: "none" } }}
        className={drawerPaper}
      >
        <Drawer
          className={drawer}
          variant="temporary"
          open={mobileOpen}
          onClose={setMobileOpen}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <IconButton onClick={setMobileOpen} className={closeMenuButton}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={title}>
            Airline BNB
          </Typography>
          <List>
            {filterMenuItems().map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => navigation(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Paper>
      <Paper sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
        <Drawer
          className={drawer}
          variant="permanent"
          classes={{
            paper: drawerPaper,
          }}
        >
          <div>
            <Typography variant="h5" className={title}>
              Airline BNB
            </Typography>
          </div>
          <List>
            {filterMenuItems().map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => navigation(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Paper>
    </nav>
  );
};

// props validation
NavDrawer.propTypes = {
  navDrawer: PropTypes.string.isRequired,
  drawer: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  closeMenuButton: PropTypes.string.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  setMobileOpen: PropTypes.func.isRequired,
  drawerPaper: PropTypes.string.isRequired,
};

export default NavDrawer;
