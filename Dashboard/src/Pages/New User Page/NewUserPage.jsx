import React from "react";
import "./NewUserPage.css";

function NewUserPage() {
  return (
    <div className="newuserpage">
      <h1 className="newUserTitle">New User</h1>
      <form action="" className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="joey" />
        </div>
        <div className="newUserItem">
          <label>Fullname</label>
          <input type="text" placeholder="joey tsino" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="example@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="@gz12qaz.." />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="(+233)55-238-3924" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="Accra | Ghana" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" id="male" name="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" id="female" name="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" id="other" name="other" value="other" />
            <labe for="other">Other</labe>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select name="active" id="active" className="newUserSelect">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </form>
      <button className="createButtonn">Create</button>
    </div>
  );
}

export default NewUserPage;
