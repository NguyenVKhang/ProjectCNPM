import React from "react";
import "./SingleUserRight.css";
import PublishIcon from "@mui/icons-material/Publish";

function SingleUserRight() {
  return (
    <div className="singleuserright">
      <div className="edittTitleAndForm">
        <h3 className="edittTitle">Edit</h3>
        <div className="formsAndImage">
          <form action="" className="forms">
            <label className="label">Username</label>
            <input type="text" className="input" placeholder="joeytsino29" />
            <label className="label">Full Name</label>
            <input type="text" className="input" placeholder="joey tsino" />
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="alokojoseph7@gmail.com"
            />
            <label className="label">Phone Number</label>
            <input
              type="text"
              className="input"
              placeholder="(+233)55-238-3924"
            />
            <label className="label">Address</label>
            <input type="text" className="input" placeholder="Accra | Ghana" />
          </form>
          <div className="uploadimg">
            <img
              src="https://scontent.facc5-1.fna.fbcdn.net/v/t1.6435-9/239010802_2268619123272208_5192183763001864507_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=19026a&_nc_eui2=AeEllOw66HL25A-BfC-6qHSwztvF6W8c76LO28XpbxzvovStCok20-AlH_t4WlH68xuoW9FY3Wup_k5bRpllVwP5&_nc_ohc=Z1keEdNFGggAX9_-QN8&_nc_ht=scontent.facc5-1.fna&oh=318f4c4a1516a48986eec36f5fd0175b&oe=61A7976A"
              alt=""
              className="uploadImage"
            />
            <label htmlFor="file">
              <PublishIcon className="singleUserRightIcon" />
            </label>
            <input type="file" id="file" style={{ display: "none" }} />
            <button className="update">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUserRight;
