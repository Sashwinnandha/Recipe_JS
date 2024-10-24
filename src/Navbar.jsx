import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavLink, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { ContextCreator } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { validate, wishlistAction, wishlistCount } from "./redux/store";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";

function NavBar() {
  const { name } = React.useContext(ContextCreator);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const data = useSelector((state) => state.validate.data);

  const count=useSelector((state)=>state.wishlist.count)

  useEffect(()=>{
    dispatch(wishlistCount(data.username.useremail))
  },[])

  if (data.username === undefined) {
    window.location.href = "/";
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(validate.logout());
    window.location.href = "/";
  };

  return (
    <AppBar style={{ position: "fixed", top: "0px", left: "0px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DinnerDiningIcon
            style={{ marginRight: "25px" }}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RECIPE STORE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  to="/dashboard"
                  style={({ isActive }) => ({
                    color: isActive ? "#e6c9a4" : "black",
                    textDecoration: "none",
                    fontWeight: "bolder",
                    marginRight: "20px",
                  })}
                  end
                >
                  About Us
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  to="findarecipe"
                  style={({ isActive }) => ({
                    color: isActive ? "#e6c9a4" : "black",
                    textDecoration: "none",
                    fontWeight: "bolder",
                    marginRight: "20px",
                  })}
                >
                  Find a Recipe
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  to={`/dashboard/wishlist/${data.username.useremail}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#e6c9a4" : "black",
                    textDecoration: "none",
                    fontWeight: "bolder",
                    marginRight: "20px",
                  })}
                  end
                >
                  WishList {count}
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
          <DinnerDiningIcon
            style={{ marginRight: "25px" }}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RECIPE STORE
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                color: isActive ? "#e6c9a4" : "white",
                textDecoration: "none",
                fontWeight: "bolder",
                marginRight: "20px",
              })}
              end
            >
              About Us
            </NavLink>
            <NavLink
              to="findarecipe"
              style={({ isActive }) => ({
                color: isActive ? "#e6c9a4" : "white",
                textDecoration: "none",
                fontWeight: "bolder",
                marginRight: "20px",
              })}
            >
              Find a Recipe
            </NavLink>
            <NavLink
              to={`/dashboard/wishlist/${data.username.useremail}`}
              style={({ isActive }) => ({
                color: isActive ? "#e6c9a4" : "white",
                textDecoration: "none",
                fontWeight: "bolder",
                marginRight: "20px",
              })}
              end
            >
              WishList{" "}
              <>
                <Badge
                  badgeContent={count}
                  color="secondary"
                >
                  <FavoriteIcon />
                </Badge>
              </>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Details">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "orange" }}>
                  {data.username.name.slice(0, 1)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <NavLink
                  to={`/dashboard/userDetails/${data.username.useremail}`}
                  style={{
                    color: "#222",
                    padding: "10px",
                    textDecoration: "none",
                    fontWeight: "bolder",
                  }}
                >
                  {data.username.name}
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <NavLink
                  onClick={handleLogout}
                  style={{
                    color: "#747bff",
                    padding: "10px",
                    textDecoration: "none",
                    fontWeight: "bolder",
                  }}
                >
                  Logout
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
