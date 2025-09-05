import * as React from 'react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import api from "../api";
import { AuthContext } from "./AuthContent";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1a2a6c" }}>
      <Toolbar disableGutters>
        <AdbIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href={"/"}
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          HomiFi
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {isLoggedIn ? (
            <Button onClick={() => navigate("/blog/new")} sx={{ my: 2, color: 'white' }}>
              Create Blog
            </Button>
          ) : (
            <>
              <Button onClick={() => navigate("/login")} sx={{ my: 2, color: 'white' }}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")} sx={{ my: 2, color: 'white' }}>
                Signup
              </Button>
            </>
          )}
        </Box>
        {isLoggedIn && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.username || "User"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem disabled>
                <Typography>Hi, {user?.username || "Guest"}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
