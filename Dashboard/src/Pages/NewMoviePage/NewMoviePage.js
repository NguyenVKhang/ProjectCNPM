import React, { useContext, useState, useEffect } from "react";
import "./NewMoviePage.css";
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";

function NewMoviePage() {
  const [movie, setMovie] = useState(null);
  const [flag, setFlag] = useState(false);


  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
    
  };

  const submitForm = (e) => {
    e.preventDefault();
    const newMovie = {
      name: movie.name,
      description: movie.description,
      length: movie.length,
      genres: movie.genres,
      trailer: movie.trailer,
      poster: movie.poster,
      release_date: movie.release_date,
      dates_minium: movie.dates_minium,
      actor: movie.actor,
      director: movie.director,

    };

    if (!newMovie.name || !newMovie.description || !newMovie.length || !newMovie.genres || !newMovie.trailer || !newMovie.poster || !newMovie.release_date || !newMovie.dates_minium || !newMovie.actor || !newMovie.director) {
      setFlag(true);
      return;
    } else {
      fetch("http://localhost:3001/movie/postMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          history.push("/movies");
        }
        );

      }
  }



  return (
    <div className="newMoviePage">
      <h1 className="newMovieTitle">Post a New Movie</h1>
      <form action="" className="uploadForm" onSubmit={submitForm}>
        <div className="uploadItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Length</label>
          <input
            type="time" step="1"            
            placeholder="Length"
            name="length"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Genres</label>
          <input
            type="text"
            placeholder="Action, Drama, Comedy"
            name="genres"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Trailer</label>
          <input
            type="text"          
            placeholder="Trailer (embeded link)"
            name="trailer"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Poster</label>
          <input
            type="text"           
            placeholder="Poster (image link)"
            name="poster"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>release_date</label>
          <input
            type="date"           
            placeholder="Release Date"
            name="release_date"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>dates_minium</label>
          <input
            type="date"           
            placeholder="Dates Minium"
            name="dates_minium"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Actor</label>
          <input
            type="text"           
            placeholder="Actor"
            name="actor"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Director</label>
          <input
            type="text"           
            placeholder="Director"
            name="director"
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            className="createNewMovie"
            type="submit"
          
          >
            Upload
          </button>
        </div>
        
      </form>
      

      {
        flag && (
          <Alert color="primary" variant="danger">
            Hãy điền đầy đủ thông tin
          </Alert>
        )
      }

    </div>
  );
}

export default NewMoviePage;
