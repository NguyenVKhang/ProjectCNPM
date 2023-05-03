import React, { useContext, useState, useEffect } from "react";
import "./NewMoviePage.css";
import { storage } from "../../Firebase/Firebase";
import { postMovie } from "./../MoviesPage/MoviesApiCall";
import { moviesContext } from "./../../Context/Movies/MoviesContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";

// feature: name, description, length,genres, trailer, poster, release_date, dates_minium, actor, director
function NewMoviePage() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgThumbnail, setImgThumbnail] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState("");
  const [genres, setGenres] = useState("");
  const [poster, setPoster] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [dates_minium, setDates_minium] = useState("");
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");


  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
    
  };

  const upload = (items) => {
    try {
      setLoading(true);
      items.forEach((item) => {
        const uploadTask = storage
          .ref(`/items/${item.file.name}`)
          .put(item.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setStatus(progress);
          },
          (err) => {
            console.log(err);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              setMovie((prev) => {
                return { ...prev, [item.label]: url };
              });
              setUploaded((prev) => prev + 1);
            });
          }
        );
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (uploaded === 5) {
      setLoading(false);
    }
  }, [uploaded]);

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgThumbnail, label: "imgThumbnail" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const { dispatch, isFetching } = useContext(moviesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postMovie(movie, dispatch);
    history.push("/movies");
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
      {/* {uploaded === 5 ? (
        <button className="createNewMovie" onClick={handleSubmit}>
          {isFetching ? <CircularProgress color="success" /> : "Create"}
        </button>
      ) : (
        <button className="createNewMovie" onClick={handleUpload}>
          {loading ? (
            <CircularProgress color="success" value={status} />
          ) : (
            "Upload"
          )}
        </button>
      )}
      {error && (
        <span className="errorBoundary">
          Something Went Wrong!! Unable to Upload
        </span>
      )} */}
    </div>
  );
}

export default NewMoviePage;
