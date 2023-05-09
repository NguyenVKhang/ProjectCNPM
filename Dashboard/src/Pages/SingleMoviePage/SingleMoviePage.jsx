import React, { useContext, useEffect, useState } from "react";
import "./SingleMoviePage.css";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { storage } from "./../../Firebase/Firebase";
import { updateMovie } from "../MoviesPage/MoviesApiCall";
import { moviesContext } from "./../../Context/Movies/MoviesContext";

function SingleMoviePage() {
  const location = useLocation();
  // const movie = location.movie;
  const [movie, setMovie] = useState([]);
  const film_id = location.pathname.split("/")[2];
  useEffect(() => {
    const dataMovies = async () => {
      // console.log(film_id)
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

  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (updatedItems) => {
    updatedItems.forEach((updatedItem) => {
      const uploadTask = storage
        .ref(`/updatedItems/${updatedItem.file.name}`)
        .put(updatedItem.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + " % done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUpdatedMovie((prev) => {
              return { ...prev, [updatedItem.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  // const { dispatch } = useContext(moviesContext);

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
// feature: name, description, length, genres, trailer, poster, release_date, dates_minium, actor, director

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
        {/* <div className="imageAndButtonWrapper">
         
          {uploaded === 3 ? (
            <button className="updateButton" onClick={handleSubmit}>
              Update
            </button>
          ) : (
            <button className="updateButton" onClick={handleUpload}>
              Upload
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default SingleMoviePage;
