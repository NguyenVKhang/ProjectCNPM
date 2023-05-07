import React, { useEffect, useState } from "react";
import "./Lists.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";
import { userRows } from "./../../Components/DummyData/DummyData";

function Lists() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const dataUsers = async () => {
      try {
        const res = await fetch("http://localhost:3001/admin/getAllAdmins", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();


        setData(result);
      } catch (error) {
        console.log(error);
      }
    };
    dataUsers();
  }, []);


  const handleDelete = (id) => {
    setData(data.filter((item) => item.employee !== id));
  };

  const columns = [
    { field: "employee_id"  , headerName: "ID", width: 50 },
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
      field: "Address",
      headerName: "Address",
      width: 250,
    },

  ];

  return (
    // console.log("hello", data.data),
    <div className="userspage">
      <div style={{ height: "100%", width: "100%" }}>
       
        {data.data && data.data.employee.length > 0 ? (
          <DataGrid
          rows={data.data.employee.map((user) => ({ ...user, id: user.employee_id }))}
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

export default Lists
;
