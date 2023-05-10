import React, { useState, useEffect } from "react";
import "./SchedulesPage.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";
function SchedulesPage() {
  const [data, setData] = useState([]);
  


  useEffect(() => {
    const dataSchedules = async () => {
      try {
        const res = await fetch("http://localhost:3001/schedule/getAllFeatureSchedules", {
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
    dataSchedules();
  }, []);
    
  


    const handleDelete = (id) => {
    console.log(id)
    fetch("http://localhost:3001/schedule/deleteSchedule/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((res) => {
      res.json();
      alert("Lịch phim đã được xóa thành công")
      window.location.reload();
    });
    
  };

  const columns = [
    { field: "showtime_id", headerName: "ID", width: 50 },
    {
      field: "film_id",
      headerName: "Film ID",
      width: 125,
    },
    {
      // get field name in firecolume
      field: "film_name",
      headerName: "Film Name",
      width: 200,
   
    },
    { field: "time", headerName: "Time", width: 200 },
    {
      field: "room_id",
      headerName: "RoomID",
      width: 130,
    },
    {
      field: "name_room",
      headerName: "Room name",
      width: 150,
    },
    
    
    {
      field: "name",
      headerName: "Cinema name",
      width: 150,
    },

    
    {
      field: "actor",
      headerName: "Actor",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="actionRow">
            <Link
              to={{ pathname: "/schedule/" + params.row.showtime_id, schedule: params.row.showtime_id }}
            >
              <button className="edit">Edit</button>
            </Link>
            <DeleteForeverOutlinedIcon
              className="icon"
              onClick={() => handleDelete(params.row.showtime_id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="moviesPage">
      <div style={{ height: "100%", width: "100%" }}>
        {data.data && data.data.schedule.length > 0 ? (
        <DataGrid
          rows={data.data.schedule.map((schedule) => 
           ({ ...schedule, id: schedule.showtime_id }) 
        )}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(r) => r.showtime_id}
        />
        ) : (
        <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default SchedulesPage;
