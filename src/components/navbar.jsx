import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import api from "../api";
import { AuthContext } from "./AuthContent";
import { styled, alpha } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LaptopIcon from "@mui/icons-material/Laptop";
import BookIcon from "@mui/icons-material/Book";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  const handleSearch = () => {
  navigate(`/blogs?search=${searchQuery}`);
};
const handleCategorySelect = (category) => {
  navigate(`/blogs?type=${encodeURIComponent(category)}`);
};

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: 2,
          flexWrap: { xs: "wrap", md: "nowrap" },        
          justifyContent: { xs: "center", md: "space-between" }, 
          gap: { xs: 1, md: 2 },                          
        }}
      >
        <AdbIcon sx={{ mr: 1, display: { xs: "none", md: "flex" } }} /> 
        

        <Typography
          variant="h6"
          noWrap
          component="a"
          href={"/"}
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            flexGrow: { xs: 1, md: 0 },                   
            textAlign: { xs: "center", md: "left" },      
          }}
        >
          HomiFi
        </Typography>

        
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            flexDirection: { xs: "column", md: "row" },  
            mt: { xs: 1, md: 0 },                        
          }}
        >
          <Button
            id="categories-btn"
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              fontSize: { xs: "12px", md: "14px" },
              px: { xs: 1, md: 2 },
            }}
          >
            Blog Categories
          </Button>
          <StyledMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleCategorySelect("General Lifestyle & Personal")} disableRipple>
              <TravelExploreIcon />
              General Lifestyle & Personal
            </MenuItem>
            <MenuItem onClick={() => handleCategorySelect("Technology & Business")} disableRipple>
              <LaptopIcon />
              Technology & Business
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => handleCategorySelect("Creative & Entertainment")} disableRipple>
              <CameraAltIcon />
              Creative & Entertainment
            </MenuItem>
            <MenuItem onClick={() => handleCategorySelect("Education & Knowledge")} disableRipple>
              <BookIcon />
              Education & Knowledge
            </MenuItem>
          </StyledMenu>

          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: { xs: "100%", md: "auto" } }}>
            <TextField
              id="search-bar"
              label="Search"
              size="small"
              variant="outlined"
              value={searchQuery}
              backgroundColor= "#ffffff"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) =>{ 
                if(e.key === "Enter"){
                  handleSearch()}}}
              sx={{ flexGrow: 1 ,backgroundColor: "#fff", borderRadius: 1,}}
            />
            <IconButton onClick={handleSearch}>
            <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            mt: { xs: 1, md: 0 },   
          }}
        >
          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{ color: "white", fontSize: { xs: "12px", md: "14px" } }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                sx={{ color: "white", fontSize: { xs: "12px", md: "14px" } }}
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/blog/new")}
                sx={{ color: "white", fontSize: { xs: "12px", md: "14px" } }}
              >
                Create Blog
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                 sx={{ color: "white", fontSize: { xs: "12px", md: "14px" } }}
              >
                  Dashboard
              </Button>
              <Tooltip title="Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.username || "User"}
                    src={user?.profilePic || ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
