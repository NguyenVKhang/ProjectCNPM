import React, { useState, useEffect } from "react";
import "./MoviesPage.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "./MoviesApiCall";
import { moviesContext } from "./../../Context/Movies/MoviesContext";

function MoviesPage() {
  // const { movies, dispatch } = useContext(moviesContext);
  const [data, setData] = useState([]);
  


  useEffect(() => {
    const dataMovies = async () => {
      try {
        const res = await fetch("http://localhost:3001/movie/getAllMovies", {
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
    
  


    const handleDelete = (id) => {
      console.log(id)
    fetch("http://localhost:3001/movie/deleteMovie/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((res) => {
      res.json();
      alert("Film đã được xóa thành công")
      window.location.reload();
    });
    
  };

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
      width: 140,
    },
    {
      field: "trailer",
      headerName: "trailer",
      width: 230,
    },

    {
      field: "length",
      headerName: "Length",
      width: 130,
    },
    {
      field: "actor",
      headerName: "Actor",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="actionRow">
            <Link
              to={{ pathname: "/movie/" + params.row.film_id, movie: params.row.film_id }}
            >
              <button className="edit">Edit</button>
            </Link>
            <DeleteForeverOutlinedIcon
              className="icon"
              onClick={() => handleDelete(params.row.film_id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="moviesPage">
      <div style={{ height: "100%", width: "100%" }}>
        {data.data && data.data.movies.length > 0 ? (
        <DataGrid
          rows={data.data.movies.map((movie) => 
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
