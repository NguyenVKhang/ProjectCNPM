import React, {  useEffect, useState } from "react";
import "./SingleMoviePage.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SingleMoviePage() {
  const location = useLocation();
  const [movie, setMovie] = useState([]);
  const film_id = location.pathname.split("/")[2];
  useEffect(() => {
    const dataMovies = async () => {
      try {
        const res = await fetch("http://localhost:3001/movie/getMovie/" + film_id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const result = await res.json();
        setMovie(result.data.movie);
      } catch (error) {
        console.log(error);
      }
    };
    dataMovies();
      
  }, []);


  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };





  const handleSubmit = (e) => {
    e.preventDefault();
    const updateMovie = {
      id: movie.film_id,
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

    if (!updateMovie.name || !updateMovie.description || !updateMovie.length 
      || !updateMovie.genres || !updateMovie.trailer || !updateMovie.poster
      || !updateMovie.release_date || !updateMovie.dates_minium || !updateMovie.actor
      || !updateMovie.director) {
      alert("All fields are required!");
      return;
  } else {
    console.log(updateMovie);
    fetch("http://localhost:3001/movie/updateMovie/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Cập nhật thành công");
        // reload lại trang
        window.location.reload();
      }
    );
  }
};

  return (
   console.log(movie),
    <div className="singleMoviePage">
      <div className="movieAndButtonWrapper">
        <h2 className="movieTitle">Movie</h2>
        <Link to="/newMovie">
          <button className="createMovie">Create</button>
        </Link>
      </div>
      <div className="ChartAndMovieInfo">
        <div className="movieInfo">
           <div className="movieProfile">
            <img src={movie?.poster} alt="" className="movieImage" />
            <span className="movieTitle">{movie?.name}</span>
          </div>
          
        </div>
      </div>
      <div className="updateWrapper">
        <div className="updateInfo">
          <form action="" className="formContainer">
            <div className="movieItem">
              <label>Movie Title</label>
              <input
                type="text"
                placeholder={movie?.name}
                defaultValue={movie?.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            
            <div className="movieItem">
              <label>Movie Description</label>
              <input
                type="text"
                defaultValue={movie?.description}
                name="description"
                onChange={handleChange}
              />
            </div>


            <div className="movieItem">
              <label>Genres</label>
              <input
                type="text"
                defaultValue={movie?.genres}
                name="genres"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Trailer</label>
              <input
                type="text"
                defaultValue={movie?.trailer}
                name="trailer"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Poster</label>
              <input
                type="text"
                defaultValue={movie?.poster}
                name="poster"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Release Date</label>
              <input
                type="date"
                defaultValue={movie?.release_date}
                name="release_date"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Date Minium</label>
              <input type="date" name="dates_minium" 
              defaultValue={movie?.dates_minium}
              onChange={handleChange} />
            </div>

            <div className="movieItem">
              <label>Actor</label>
              <input
                type="text"
                defaultValue={movie?.actor}
                name="actor"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Director</label>
              <input
                type="text"
                defaultValue={movie?.director}
                name="director"
                onChange={handleChange}
              />
            </div>

            <div>
              <button className="updateButton" onClick={handleSubmit}>
                Update
              </button>
            </div>

            
          </form>
        </div>
  
      </div>
    </div>
  );
}

export default SingleMoviePage;
