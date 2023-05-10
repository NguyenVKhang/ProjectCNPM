import React from "react";
import "./Sidebar.css";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
     
      <div className="itemsContainer">
        <div className="itemTitle">
          <span>Quick Menu</span>
        </div>
        <div className="items">
          <Link to="/schedules" className="link">
            <div className="subItem2Wrapper">
              <EqualizerOutlinedIcon className="subItem2" />
              <span className="subItem2">Schedule</span>
            </div>
          </Link>
          <Link to="/movies" className="link">
            <div className="subItem1Wrapper">
              <LocalMoviesOutlinedIcon className="subItem0" />
              <span className="subItem1">Movies</span>
            </div>
          </Link>
          <Link to="/users" className="link">
            <div className="subItem0Wrapper">
              <PersonOutlinedIcon className="subItem1" />
              <span className="subItem0">Users</span>
            </div>
          </Link>

          <Link to="/lists" className="link">
            <div className="subItem2Wrapper">
              <FormatListBulletedOutlinedIcon className="subItem2" />
              <span className="subItem2">Admin</span>
            </div>
          </Link>
          <Link to="/rooms" className="link">
          <div className="subItem2Wrapper">
            <WorkOutlineOutlinedIcon  className="subItem0" />
            
              <span className="subItem2">Rooms</span>
            </div>
          </Link>

        </div>
      </div>
     
    </div>
  );
}

export default Sidebar;
