import React, { useContext } from "react";
import "./Navbar.css";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Badge from "@mui/material/Badge";
import SettingsIcon from "@mui/icons-material/Settings";
import { authContext } from "./../../Context/Auth/AuthContext";
import { logout } from "../../Context/Auth/AuthActions";

function Navbar() {
  const { user, dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="Navbar">
      <div className="NavbarWrapper">
        <div className="topLeft">
          <span className="logo">JOEY ADMIN</span>
        </div>
        <div className="topRight">
          <div className="NavbarIcons">
            <Badge badgeContent={4} color="primary" className="badge">
              <NotificationsActiveIcon />
            </Badge>
            <SettingsIcon className="badge" />
          </div>
          <div className="profile">
            {user.profilePic ? <img src={user.profilePic} alt="" /> : null}
          </div>
          <div className="logout" onClick={handleLogout}>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
