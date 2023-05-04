import React, { useContext, useState, useEffect } from "react";
import "./ScheduleNew.css";
import { storage } from "../../Firebase/Firebase";
import { postMovie } from "./../MoviesPage/MoviesApiCall";
import { moviesContext } from "./../../Context/Movies/MoviesContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";

// feature: name, description, length,genres, trailer, poster, release_date, dates_minium, actor, director
function ScheduleNew() {
  const [schedule, setMovie] = useState(null);
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
    setMovie({ ...schedule, [e.target.name]: value });
  };

//   const upload = (items) => {
//     try {
//       setLoading(true);
//       items.forEach((item) => {
//         const uploadTask = storage
//           .ref(`/items/${item.file.name}`)
//           .put(item.file);
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setStatus(progress);
//           },
//           (err) => {
//             console.log(err);
//           },
//           () => {
//             uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//               setMovie((prev) => {
//                 return { ...prev, [item.label]: url };
//               });
//               setUploaded((prev) => prev + 1);
//             });
//           }
//         );
//       });
//     } catch (error) {
//       console.log(error);
//       setError(true);
//     }
//   };

  useEffect(() => {
    if (uploaded === 5) {
      setLoading(false);
    }
  }, [uploaded]);

//   const handleUpload = (e) => {
//     e.preventDefault();
//     upload([
//       { file: img, label: "img" },
//       { file: imgTitle, label: "imgTitle" },
//       { file: imgThumbnail, label: "imgThumbnail" },
//       { file: trailer, label: "trailer" },
//       { file: video, label: "video" },
//     ]);
//   };

  const { dispatch, isFetching } = useContext(moviesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postMovie(schedule, dispatch);
    history.push("/movies");
  };

  const submitForm = (e) => {
    e.preventDefault();
    const newSchedule = {
        ticket_fare: schedule.ticket_fare,
        time: schedule.date + " " + schedule.time,
        room_id: schedule.room_id,
        film_id: schedule.film_id,
    };

    if (!newSchedule.ticket_fare || !schedule.time || !schedule.date || !newSchedule.room_id || !newSchedule.film_id) {
      setFlag(true);
      return;
    } else {
      fetch("http://localhost:3001/schedule/postSchedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSchedule),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          history.push("/schedules");
        }
        );

      }
  }



  return (
    <div className="newMoviePage">
      <h1 className="newMovieTitle">Post a New Schedule</h1>
      <form action="" className="uploadForm" onSubmit={submitForm}>
        <div className="uploadItem">
          <label>Ticket Fare</label>
          <input
            type="number"
            placeholder="100000"
            name="ticket_fare"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Time</label>
          <input
            type="time" step="1"
            placeholder="Description"
            name="time"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Date</label>
          <input
            type="date"           
            placeholder="Date"
            name="date"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Room ID</label>
          <input
            type="number"   
            placeholder="Room ID"
            name="room_id"
            onChange={handleChange}
          />
        </div>
        <div className="uploadItem">
          <label>Film ID</label>
          <input
            type="number"    
            placeholder="Film ID"
            name="film_id"
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            className="createNewMovie"
            type="submit"
          
          >
            Create
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

export default ScheduleNew;
