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
        // setSchedule(result.data.schedule);
        // data.schedule.time: "2021-10-10T10:00:00.000Z"
        // convert to set default value for input type="date" and input type="time"
        const dateObj = new Date(result.data.schedule.time);
        
        const date = dateObj.toISOString().split("T")[0];
        dateObj.setUTCHours(dateObj.getUTCHours() + 7);
        const time = dateObj.toISOString().split("T")[1].split(".")[0];

      
        setSchedule({ ...schedule, date: date, time: time, room_id: result.data.schedule.room_id, film_id: result.data.schedule.film_id });
        // schedule.date = date;
        // schedule.time = time;
        // schedule.date = date;
        // schedule.time = time;
        // document.getElementById("date").value = date;
        // document.getElementById("time").value = time;
        // console.log(schedule);
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
// feature: id, date: date + time, room_id, film_id
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateSchedule = {
      id: showtime_id,
      date: schedule.date + " " + schedule.time,
      room_id: schedule.room_id,
      film_id: schedule.film_id,
    };

    if (!schedule.date  || !schedule.time || !schedule.room_id || !schedule.film_id) {
      alert("All fields are required!");
      return;
  } else {
    fetch("http://localhost:3001/schedule/updateSchedule/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateSchedule),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Cập nhật thành công");
        window.location.reload();
      }
    );
  }
};

  return (
   console.log(schedule),
    <div className="singleMoviePage">
      <div className="movieAndButtonWrapper">
        <h2 className="movieTitle">Schedule</h2>
        <Link to="/scheduleNew">
          <button className="createMovie">Create</button>
        </Link>
      </div>
      <div className="ChartAndMovieInfo">
        <div className="movieInfo">
        </div>
      </div>
      <div className="updateWrapper">
        <div className="updateInfo">
          <form action="" className="formContainer">
            <div className="movieItem">
              <label>Date</label>
              <input
                type="date"
                placeholder={schedule?.date}
                defaultValue={schedule?.date}
                name="date"
                onChange={handleChange}
              />
            </div>

            <div className="movieItem">
              <label>Time</label>
              <input
                type="time" step={1}
                placeholder={schedule?.time}
                defaultValue={schedule?.time}
                name="time"
                onChange={handleChange}
              />
            </div>
            
            <div className="movieItem">
              <label>Room ID</label>
              <input
                type="number"
                placeholder={schedule?.room_id}
                defaultValue={schedule?.room_id}
                name="room_id"
                onChange={handleChange}
              />

            </div>


          
            <div className="movieItem">
              <label>Film ID</label>
              <input
                type="number"
                defaultValue={schedule?.film_id}
                name="film_id"
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

export default ScheduleSingle;
