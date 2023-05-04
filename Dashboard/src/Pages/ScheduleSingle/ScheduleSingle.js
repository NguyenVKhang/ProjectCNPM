import React, { useContext, useEffect, useState } from "react";
import "./ScheduleSingle.css";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { storage } from "./../../Firebase/Firebase";
function ScheduleSingle() {
  const location = useLocation();
  // const movie = location.movie;
  const [schedule, setSchedule] = useState([]);
  const showtime_id = location.pathname.split("/")[2];
  useEffect(() => {
    const dataMovies = async () => {
      // console.log(film_id)
      // router.get("/getScheduleById/:id", scheduleController.getScheduleById);
      try {
        const res = await fetch("http://localhost:3001/schedule/getScheduleById/" + showtime_id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const result = await res.json();
        setSchedule(result.data.schedule);
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
    setSchedule({ ...schedule, [e.target.name]: value });
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
      id: schedule.film_id,
      name: schedule.name,
      description: schedule.description,
      length: schedule.length,
      genres: schedule.genres,
      trailer: schedule.trailer,
      poster: schedule.poster,
      release_date: schedule.release_date,
      dates_minium: schedule.dates_minium,
      actor: schedule.actor,
      director: schedule.director,
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
   console.log(schedule),
    <div className="singleMoviePage">
      <div className="movieAndButtonWrapper">
        <h2 className="movieTitle">Movie</h2>
        <Link to="/scheduleNew">
          <button className="createMovie">Create</button>
        </Link>
      </div>
      <div className="ChartAndMovieInfo">
        <div className="movieInfo">
           <div className="movieProfile">
            <img src={schedule?.poster} alt="" className="movieImage" />
            <span className="movieTitle">{schedule?.name}</span>
          </div>
          {/*
          <div className="movieDetailss">
            <div className="movieId">
              <span className="id">ID:</span>
              <span className="Amount">{movie?.film_id}</span>
            </div>
            <div className="movieSales">
              <span className="sales">Genres:</span>
              <span className="salesAmount">{movie?.genres}</span>
            </div>
            <div className="activeMovie">
              <span className="active">Description:</span>
              <span className="statuss">{movie?.description}</span>
            </div>
            <div className="movieStock">
              <span className="inStock">Length:</span>
              <span className="statusss">{movie?.length}</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className="updateWrapper">
        <div className="updateInfo">
          <form action="" className="formContainer">
            <div className="movieItem">
              <label>Movie Title</label>
              <input
                type="text"
                placeholder={schedule?.name}
                defaultValue={schedule?.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            
            <div className="movieItem">
              <label>Movie Description</label>
              <input
                type="text"
                defaultValue={schedule?.description}
                name="description"
                onChange={handleChange}
              />
            </div>


            <div className="movieItem">
              <label>Genres</label>
              <input
                type="text"
                defaultValue={schedule?.genres}
                name="genres"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Trailer</label>
              <input
                type="text"
                defaultValue={schedule?.trailer}
                name="trailer"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Poster</label>
              <input
                type="text"
                defaultValue={schedule?.poster}
                name="poster"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Release Date</label>
              <input
                type="date"
                defaultValue={schedule?.release_date}
                name="release_date"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Date Minium</label>
              <input type="date" name="dates_minium" 
              defaultValue={schedule?.dates_minium}
              onChange={handleChange} />
            </div>

            <div className="movieItem">
              <label>Actor</label>
              <input
                type="text"
                defaultValue={schedule?.actor}
                name="actor"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Director</label>
              <input
                type="text"
                defaultValue={schedule?.director}
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

export default ScheduleSingle;
