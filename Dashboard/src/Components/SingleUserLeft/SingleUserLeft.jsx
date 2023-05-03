import React from "react";
import "./SingleUserLeft.css";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";

function SingleUserLeft() {
  return (
    <div className="singleUserLeft">
      <ul className="userDetails">
        <li className="profileWrapper">
          <img
            src="https://scontent.facc5-1.fna.fbcdn.net/v/t1.6435-9/239010802_2268619123272208_5192183763001864507_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=19026a&_nc_eui2=AeEllOw66HL25A-BfC-6qHSwztvF6W8c76LO28XpbxzvovStCok20-AlH_t4WlH68xuoW9FY3Wup_k5bRpllVwP5&_nc_ohc=Z1keEdNFGggAX9_-QN8&_nc_ht=scontent.facc5-1.fna&oh=318f4c4a1516a48986eec36f5fd0175b&oe=61A7976A"
            alt=""
            className="imagee"
          />
          <div className="profileDetailss">
            <span className="profileNamee">Joey Tsino</span>
            <span className="profession">Software Engineer</span>
          </div>
        </li>
        <li className="accountDetails">
          <span className="accountDetailsTitle">Account Details</span>
          <div className="accountDetailsNameWrapper">
            <PersonOutlinedIcon className="singleUserLeftIcons" />
            <span className="accountDetailsName">Joey Tsino</span>
          </div>
          <div className="dateWraper">
            <DateRangeIcon className="singleUserLeftIcons" />
            <span className="Datee">10.12.1999</span>
          </div>
        </li>
        <li className="contactDetails">
          <span className="contactDetailsTitle">Contact Details</span>
          <div className="contactDetailsWrapper">
            <div className="phoneWrapper">
              <PhoneAndroidOutlinedIcon className="singleUserLeftIcons" />
              <span className="phone">(+233) 55-238-3924</span>
            </div>
            <div className="emailWrapper">
              <EmailOutlinedIcon className="singleUserLeftIcons" />
              <span className="email">alokojoseph7@gmail.com</span>
            </div>
            <div className="locationWrapper">
              <LocationSearchingOutlinedIcon className="singleUserLeftIcons" />
              <span className="location">New Dawhenya</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SingleUserLeft;
