import React from "react";
import "./SingleUserPage.css";
import { Link } from "react-router-dom";
import SingleUserLeft from "./../../Components/SingleUserLeft/SingleUserLeft";
import SingleUserRight from "./../../Components/SingleUserRight/SingleUserRight";

function SingleUserPage() {
  return (
    <div className="singleuserpage">
      <div className="editAndButton">
        <h3 className="editTitle">Edit User</h3>
        <Link to="/newUser">
          <button className="createButton">Create</button>
        </Link>
      </div>
      <div className="singleUserComponents">
        <SingleUserLeft />
        <SingleUserRight />
      </div>
    </div>
  );
}

export default SingleUserPage;
