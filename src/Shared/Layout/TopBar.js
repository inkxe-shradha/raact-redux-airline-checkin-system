import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { format } from "date-fns";
const TopBar = ({ appBar, mobileOpen, menuButton, auth = true, logOutApp }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = (isLogOut = false) => {
    setAnchorEl(null);
    if (isLogOut) {
      logOutApp();
    }
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <AppBar color="primary" className={appBar} position="fixed">
      <Toolbar>
        {/* Ham menu options Hide/show options */}
        {auth && (
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={mobileOpen}
            className={menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography sx={{ flexGrow: 1 }} color="secondary">
          {auth
            ? `
         Last logged In ${format(new Date(), "MMMM d, yyyy")}
         `
            : `Welcome to Airline Services`}
        </Typography>
        {/* Account setup */}
        {auth && (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleClose(true)}>Log Out</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  appBar: PropTypes.string,
  mobileOpen: PropTypes.func,
  menuButton: PropTypes.string,
  auth: PropTypes.bool,
  logOutApp: PropTypes.func.isRequired,
};

export default TopBar;
