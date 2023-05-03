import React, { useEffect, useState } from "react";
import "./Userspage.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";
import { userRows } from "./../../Components/DummyData/DummyData";
import { Alert } from "@mui/material";

function Userspage() {
  const [data, setData] = useState([]);
  // const renderer = ({ hours, minutes, seconds, completed }) => {
  // const dataUser = () => {
  //   // use fetch to get data from api
  //   fetch("http://localhost:3001/user/getAllUsers", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {   
  //       setData(result);
  //     });
  // };

  useEffect(() => {
    const dataUsers = async () => {
      try {
        const res = await fetch("http://localhost:3001/user/getAllUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        // Address_city = result.data.users[0].address + " ," + result.data.users[0].city;
        for (let i = 0; i < result.data.users.length; i++) {
          result.data.users[i].Address_city =
            result.data.users[i].Address + ", " + result.data.users[i].City;
          if (result.data.users[i].Address === null) {
            result.data.users[i].Address_city = result.data.users[i].City;
          } else if(result.data.users[i].City === null){
            result.data.users[i].Address_city = result.data.users[i].Address;
          }
          else if(result.data.users[i].Address === null && result.data.users[i].City === null){
            result.data.users[i].Address_city = "";
          }
        }

        setData(result);
      } catch (error) {
        console.log(error);
      }
    };
    dataUsers();
  }, []);


  const handleDelete = (id) => {
    fetch("http://localhost:3001/user/deleteUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((res) => {
      res.json();
      alert("Người dùng đã được xóa thành công")
      window.location.reload();
    });
    
  };

  const columns = [
    { field: "user_id"  , headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "User",
      width: 160,
    },
    { field: "gmail", headerName: "Email", width: 200 },
    {
      field: "phone_number",
      headerName: "Phone number",
      width: 200,
    },
    {
      field: "password",
      headerName: "Password",
      width: 160,
    },
    {
      field: "Address_city",
      headerName: "Address",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="actionRow">
            {/* <Link to={"/user/" + params.row.id}>
              <button className="edit">Edit</button>
            </Link> */}
            <DeleteForeverOutlinedIcon
              className="icon"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    // console.log("hello", data.data),
      
    <div className="userspage">
      
      <div style={{ height: "100%", width: "100%" }}>
       
        {data.data && data.data.users.length > 0 ? (
          <DataGrid
          rows={data.data.users.map((user) => ({ ...user, id: user.user_id }))}
          columns={columns}
          pageSize={8}
          checkboxSelection
          disableSelectionOnClick
          />
        ) : (
          <h1>Loading...</h1>
        )}

        
      </div>
    </div>
  );
}

export default Userspage;
