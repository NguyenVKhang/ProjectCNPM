import React from "react";
import "./Sidebar.css";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
// import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
     
      <div className="itemsContainer">


      <div className="itemTitle">
          <span>Quick Menu</span>
        </div>



        <div className="items">
            <Link to="/tickets" className="link">
              <div className="subItem2Wrapper">
                <ConfirmationNumberOutlinedIcon className="subItem2" />
                <span className="subItem2">Tickets</span>
              </div>
            </Link>
            <Link to="/schedules" className="link">
              <div className="subItem2Wrapper">
                <EditCalendarOutlinedIcon className="subItem2" />
                <span className="subItem2">Schedule</span>
              </div>
            </Link>
            <Link to="/movies" className="link">
              <div className="subItem1Wrapper">
                <LocalMoviesOutlinedIcon className="subItem0" />
                <span className="subItem1">Movies</span>
              </div>
            </Link>
          </div>

      <div className="itemTitle">
          <span>Analytics</span>
        </div>
        <div className="items">
          <Link to="/sales" className="link">
            <div className="subItem2Wrapper">
              <EqualizerOutlinedIcon className="subItem2" />
              <span className="subItem2">Sales</span>
            </div>
          </Link>

        </div>


        

       
          <div className="itemTitle">
            <span>People Role</span>
          </div>
          <div className="items">
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
            <MeetingRoomOutlinedIcon  className="subItem0" />
            
              <span className="subItem2">Rooms</span>
            </div>
          </Link>

        </div>
      </div>
     
    </div>
  );
}

export default Sidebar;
