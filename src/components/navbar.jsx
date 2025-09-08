
import React,  { useContext, useState } from "react";
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
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LaptopIcon from '@mui/icons-material/Laptop';
import BookIcon from '@mui/icons-material/Book';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

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

   const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    <AppBar position="fixed" sx={{ 
    background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)" 
  }}>
      <Toolbar disableGutters sx={{ pl: 2.5 }}>
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
         <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Blog Categories
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'demo-customized-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <TravelExploreIcon />
          General Lifestyle & Personal
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
           <LaptopIcon />
          Technology & Business
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <CameraAltIcon />
          Creative & Entertainment
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <BookIcon />
          Education & Knowledge
        </MenuItem>
      </StyledMenu>
    </div>
    <div>
      <TextField id="outlined-basic" label="Search" variant="outlined" />
        <SearchIcon />
    </div>
        {isLoggedIn && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.username || "User"} src={user?.profilePic || ""} />
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
