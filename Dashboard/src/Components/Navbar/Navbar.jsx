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
          <span className="logo">D3K ADMIN</span>
        </div>
        <div className="topRight">
          {/* <div className="NavbarIcons">
            <Badge badgeContent={4} color="primary" className="badge">
              <NotificationsActiveIcon />
            </Badge>
            <SettingsIcon className="badge" />
          </div> */}
          {/* <div className="profile">
            {user.profilePic ? <img src={user.profilePic} alt="" /> : null}
          </div> */}
          <img class="icon" src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_login25.png" alt="icon"></img>
          <div className="logout" onClick={handleLogout}>
            <span>Thoát</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
