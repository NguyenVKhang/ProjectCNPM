// import React, { useState, useEffect } from "react";
// import "./LeftWidget.css";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import axiosInstance from "../../axios";

// function LeftWidget() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const res = await axiosInstance.get("users");
//         setUsers(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getUsers();
//   }, []);

//   return (
//     <div className="leftwidget">
//       <h3 className="Title">New Members</h3>
//       <ul className="userProfile">
//         {users.map((user) => (
//           <li key={user._id} className="userInfo">
//             <img
//               src={
//                 user.profilePic ||
//                 "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg"
//               }
//               alt=""
//               className="image"
//             />
//             <div className="userDetails">
//               <span className="name">{user.username}</span>
//             </div>
//             <div className="visibility">
//               <RemoveRedEyeIcon />
//               <button className="display">Display</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default LeftWidget;
