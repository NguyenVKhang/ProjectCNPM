import React from "react";
import "./Sidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
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
      {/* <div className="itemsContainer">
        <div className="itemTitle">
          <span>Notifications</span>
        </div>
        <div className="items">
          <div className="subItem0Wrapper">
            <EmailOutlinedIcon className="subItem0" />
            <span className="subItem0">Mail</span>
          </div>
          <div className="subItem1Wrapper">
            <DynamicFeedOutlinedIcon className="subItem1" />
            <span className="subItem1">Feedback</span>
          </div>
          <div className="subItem2Wrapper">
            <ChatBubbleOutlineOutlinedIcon className="subItem2" />
            <span className="subItem2">Messages</span>
          </div>
        </div>
      </div> */}
      {/* <div className="itemsContainer">
        <div className="itemTitle">
          <span>Staff</span>
        </div>
        <div className="items">
          <div className="subItem0Wrapper">
            <WorkOutlineOutlinedIcon className="subItem0" />
            <span className="subItem0">Manage</span>
          </div>
          <div className="subItem1Wrapper">
            <TimelineOutlinedIcon className="subItem1" />
            <span className="subItem1">Analytics</span>
          </div>
          <div className="subItem2Wrapper">
            <ErrorOutlinedIcon className="subItem2" />
            <span className="subItem2">Reports</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
