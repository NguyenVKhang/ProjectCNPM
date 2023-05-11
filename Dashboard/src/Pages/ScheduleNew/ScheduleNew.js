import React, {  useState } from "react";
import "./ScheduleNew.css";
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";

function ScheduleNew() {
  const [schedule, setMovie] = useState(null);
  const [flag, setFlag] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...schedule, [e.target.name]: value });
  };


  const submitForm = (e) => {
    e.preventDefault();
    const newSchedule = {
        ticket_fare: 10000,
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
          if (data.status === "error") {
            if(data.message === "Room is not available"){
              alert("Phòng không tồn tại. Yêu cầu chọn lại phòng chiếu.")
            }
            if (data.message === "Film is not available") {
              alert("Film không tồn tại. Yêu cầu chọn lại film.")
            }

            if (data.message === "There is a showtime in the same room and time within 2 hours") {
              alert("Có lịch chiếu trong 2 tiếng tới cho cùng phòng và cùng thời gian. Yêu cầu chọn lại thời gian hoặc phòng chiếu.")
            }

            
          } else {
            alert("Thêm lịch chiếu thành công");
            history.push("/schedules");
          }
          


          
        }
        );

      }
  }



  return (
    <div className="newMoviePage">
      <h1 className="newMovieTitle">Post a New Schedule</h1>
      <form action="" className="uploadForm" onSubmit={submitForm}>

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
 
    </div>
  );
}

export default ScheduleNew;
