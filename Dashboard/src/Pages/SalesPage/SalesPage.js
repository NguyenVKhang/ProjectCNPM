import React, { useState, useEffect } from "react";
import "./SalesPage.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";

function MoviesPage() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const dataMovies = async () => {
      try {
        const res = await fetch("http://localhost:3001/analytics/getAllProfit", {
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
    { field: "film_id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Movie",
      width: 250,
  
    },
    { field: "genres", headerName: "Genre", width: 200 },
    {
      field: "dates_minium",
      headerName: "Khởi chiếu",
      width: 160,
    },

    {
      field: "length",
      headerName: "Length",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "total_revenue",
      headerName: "Sales (VNĐ)",
      width: 180,
    }

  ];



  return (
    <div className="moviesPage">
      <div style={{ height: "100%", width: "100%" }}>
        {data.data && data.data.Sales.length > 0 ? (
        <DataGrid
          rows={data.data.Sales.map((movie) => 
           ({ ...movie, id: movie.film_id }) 
        )}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(r) => r.film_id}    

        />
        ) : (
        <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;
