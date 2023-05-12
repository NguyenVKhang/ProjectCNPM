import React, { useState, useEffect } from "react";
import "./TicketPage.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";

function TicketPage() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const dataMovies = async () => {
      try {
        const res = await fetch("http://localhost:3001/analytics/getAllTicket", {
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
    dataMovies();
  }, []);
    

  const columns = [
    { field: "ticket_id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
  
    },
    { field: "gmail", headerName: "Gmail", width: 200 },

    {
      field: "film_name",
      headerName: "Film",
      width: 230,
    },

    {
      field: "time",
      headerName: "Time",
      width: 180,
    },
    {
        field: "name_room",
        headerName: "Room",
        width: 130,
    },
    {
        field: "seat_name",
        headerName: "Seat",
        width: 130,
    },

  ];

  return (
    <div className="moviesPage">
      <div style={{ height: "100%", width: "100%" }}>
        {data.data && data.data.Tickets.length > 0 ? (
        <DataGrid
          rows={data.data.Tickets.map((movie) => 
           ({ ...movie, id: movie.ticket_id }) 
        )}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(r) => r.ticket_id}
        />
        ) : (
        <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default TicketPage;
