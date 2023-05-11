// const MovieNowShowing = require("../models/MovieNowShowing");
// const MovieComingSoon = require("../models/MovieComingSoon");
const axios = require("axios");
import pool from "../config/index.js";
class movieController {

  async getMoviesNowShowing(req = new Request(), res) {
    try {
      const [moviesNowShowing, fields] = await pool.execute('SELECT * FROM film where dates_minium < now()');
      // for (let i = 0; i < data.data.moviesNowShowing.length; i++) {
      //   data.data.moviesNowShowing[i].date_minium = data.data.moviesNowShowing[i].date_minium + 1;
      // }

      for(let i = 0; i < moviesNowShowing.length; i++){
        moviesNowShowing[i].dates_minium = moviesNowShowing[i].dates_minium.getFullYear() + '-' + (moviesNowShowing[i].dates_minium.getMonth() + 1) + '-' + moviesNowShowing[i].dates_minium.getDate();

      }
      
      moviesNowShowing.forEach((movie) => {
        const time = movie.length;
        const timeConvert = time.split(':');
        const timeConvert2 = parseInt(timeConvert[0]) * 60 + parseInt(timeConvert[1]);
        movie.length = timeConvert2;
      })

      

      return res.status(200).json({
        status: "success",
        data: { moviesNowShowing },
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }



  async getMoviesComingSoon(req = new Request(), res) {
    try {
      const [moviesComingSoon, fields] = await pool.execute('SELECT * FROM film where dates_minium > now()');

      // for(let i = 0; i < moviesNowShowing.length; i++){
      //   moviesNowShowing[i].dates_minium = moviesNowShowing[i].dates_minium.getFullYear() + '-' + (moviesNowShowing[i].dates_minium.getMonth() + 1) + '-' + moviesNowShowing[i].dates_minium.getDate();

      // }

      for (let i = 0; i < moviesComingSoon.length; i++) {
        moviesComingSoon[i].dates_minium = moviesComingSoon[i].dates_minium.getFullYear() + '-' + (moviesComingSoon[i].dates_minium.getMonth() + 1) + '-' + moviesComingSoon[i].dates_minium.getDate();

      }

      moviesComingSoon.forEach((movie) => {
        const time = movie.length;
        const timeConvert = time.split(':');
        const timeConvert2 = parseInt(timeConvert[0]) * 60 + parseInt(timeConvert[1]);
        movie.length = timeConvert2;
      }
      )

      return res.status(200).json({
        status: "success",
        data: { moviesComingSoon },
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  async getMovie(req, res) {
    const { id } = req.params;
    try {
      const [rows] = await pool.execute(`SELECT * from film where film_id = ${id};`);

      // convert time to yyyy:mm:dd
      rows.forEach((movie) => {
        movie.release_date = movie.release_date.toISOString().slice(0, 10);
        movie.dates_minium = movie.dates_minium.toISOString().slice(0, 10);
      })
      return res.status(200).json({
        status: "success",
        data: { movie: rows[0] },
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }


  async getDetailMovieNowShowing(req = new Request(), res) {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Id is required",
      });
    }
    
    try {
      const [movie, fields] = await pool.execute('SELECT * FROM film WHERE film_id = ?', [id]);
      
      const time = movie[0].length;
      const timeConvert = time.split(':');
      const timeConvert2 = parseInt(timeConvert[0]) * 60 + parseInt(timeConvert[1]);
      movie[0].length = timeConvert2;

      
      const year = movie[0].dates_minium.getFullYear();
      const month = movie[0].dates_minium.getMonth() + 1;
      const day = movie[0].dates_minium.getDate();

      // const date = new Date(year, month, day);
      movie[0].dates_minium = day + "-" + month + "-" + year;
      
      return res.status(200).json({
        status: "success",
        data: { movie }
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  // async getDetailMovieComingSoon(req = new Request(), res) {
  //   const { name } = req.body;
  //   if (!name) {
  //     return res.status(400).json({
  //       status: "error",
  //       message: "Name is required",
  //     });
  //   }
  //   try {
  //     const movie = await MovieComingSoon.findOne({
  //       name
  //     });
  //     if (!movie) {
  //       return res
  //         .status(400)
  //         .json({ status: "error", message: "Movie does not exist" });
  //     }
  //     return res.status(200).json({
  //       status: "success",
  //       data: { movie }
  //     });
  //   } catch (error) {
  //     return res.status(503).json({
  //       status: "error",
  //       message: "Service error. Please try again later",
  //     });
  //   }
  // }

  /** */
  

  async getMiddle(req, res) {
    try {
      const response = await axios.get('https://api.sieuthicode.net/historyapizalopay/xLYzPryvMEtQ-ESBjIk-CHUA-mcfv-xZaf');
    
      const data = response.data.zalopayMsg.tranList;
      return res.status(200).json({ status: "success", data })

    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });

    }
  }

  /**
   * 
   * @param {Request} req 
   * @param {Respone} res 
   * @returns
   */


  //updateStatus post
  async updateStatus(req = new Request(), res) {
    try {
      const { movie, position, position_booked } = req.body;
  
      console.log(position_booked);
      console.log([movie[0].id, position[0][0].room_id]);
  
      const [data] = await pool.execute(
        `SELECT room_seat.seat_name
        FROM booked_seat
        INNER JOIN room_seat ON booked_seat.seat_id = room_seat.seat_id
        WHERE booked_seat.showtime_id = ?`,
        [movie[0].id]
      );
  
      let booked = false;
      data.forEach((data1) => {
        position_booked.forEach((p) => {
          if (data1.seat_name === p) {
            booked = true;
          }
        });
      });
  
      if (!booked) {
        const promises = position_booked.map(async (p) => {
          const [rows] = await pool.execute(
            `INSERT INTO booked_seat (showtime_id, seat_id)
            VALUES (?, (SELECT seat_id FROM room_seat WHERE room_id = ? AND seat_name = ?))`,
            [movie[0].id, position[0][0].room_id, p]
          );
          return rows;
        });
  
        await Promise.all(promises);
  
        return res.status(200).json({
          status: "success",
          type: 1 // thành công
        });
      } else {
        return res.status(200).json({
          status: "success",
          type: 2 // có người đặt rồi
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error"
      });
    }
  }
  
  
  async updateStatusEmpty(req = new Request(), res) {
    const { movie, position, position_booked } = req.body;
    console.log(movie);
    console.log(`------------`);
    try {
      const promises = position_booked.map(async (p) => {
        const [rows] = await pool.execute(`DELETE FROM booked_seat WHERE seat_id = (SELECT seat_id from room_seat where room_seat.seat_name = ? and room_id = ?) and booked_seat.showtime_id = ?;`, [p, position[0][0].room_id, movie[0].id]);
        return rows;
      });
      await Promise.all(promises);
  
      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
      });
    }
  }
  




  async getShowTime(req, res) {
    const film_id = req.params.id;
    console.log(film_id);
    const currentDay = new Date();
    let date = [];
    for(let i = 0; i < 20; i++) {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      let [cinema_data] = await pool.execute(`SELECT cinema.name as name, cinema.cinema_id as id from cinema inner join cinema_room on cinema_room.cinema_id = cinema.cinema_id inner join showtime on showtime.room_id = cinema_room.room_id inner join film on film.film_id = showtime.film_id where film.film_id = ? and cast(showtime.time as date) = cast(? as date) GROUP BY(cinema.name);`, [film_id, currentDate]);
      let cinemas = await Promise.all(cinema_data.map(async (cinema) => {
        let cinema_name = cinema.name;
        let id = cinema.id;
        let [cinema_room] = await pool.execute(`SELECT distinct cinema_room.room_id as room_id, cinema_room.name_room as name_room FROM cinema_room inner join showtime on showtime.room_id = cinema_room.room_id inner join film on film.film_id = showtime.film_id WHERE film.film_id = ? and cinema_room.cinema_id = ? and cast(showtime.time as date) = cast(? as date);`, [film_id, id, currentDate]);
        let sites = await Promise.all(cinema_room.map(async (room) => {
          let id = room.room_id;
          let site_name = room.name_room;
          let [times]  = await pool.execute('SELECT Time(showtime.time) as time, showtime.showtime_id as id FROM showtime inner join film on film.film_id = showtime.film_id where film.film_id = ? and showtime.room_id = ? and cast(showtime.time as date) = cast(? as date);', [film_id, id, currentDate]);
          let Time = times.map(async (time) => {
            let id = time.id;
            let timeSt = time.time;
            return {id, timeSt};
          });
          Time = await Promise.all(Time);
          return {id, site_name, Time};
        }));
        return {cinema_name, id, Site: sites};
      }));
      let types = [];
      let type = {id: 1, type_name: "2D Phụ đề tiếng anh", Cinema: cinemas};
      types.push(type);
      let locations = [];
      let location = {id: 1, place: "Hà nội", Movie_Type: types};
      locations.push(location);
      let datei = {id: i, day: currentDate, Location: locations};
      date.push(datei);
    }
    return res.status(200).json({
      status: "success",
      data: { Date: date }
    });
  }
  
  async getAllMovies(req, res) {
    try {
      const [movies] = await pool.execute('SELECT * FROM film');

      for (let i = 0; i < movies.length; i++) {
        // convert to string
        movies[i].dates_minium = movies[i].dates_minium.toISOString().slice(0, 10);
      }

      return res.status(200).json({
        status: "success",
        data: { movies: movies }
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  async postMovie(req, res) {
    //name, description, length,genres, trailer, poster, release_date, dates_minium, actor, director
    // console.log(req.body)
    
    try {
      
      const { name, description, length, genres, trailer, poster, release_date, dates_minium, actor, director } = req.body;
      const [movie] = await pool.execute('SELECT * FROM film WHERE name = ?', [name]);
      if (movie.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Movie already exists",
        });
      }

      const [result] = await pool.execute('INSERT INTO film (name, description, length, genres, trailer, poster, release_date, dates_minium, actor, director) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, description, length, genres, trailer, poster, release_date, dates_minium, actor, director]);
      return res.status(200).json({
        status: "success",
        data: { id: result.insertId }
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });



    }
  }

  async deleteMovie(req = new Request(), res) {
    try {
      const id = req.body.id;
      await pool.execute(`DELETE FROM film WHERE film_id = ${id};`);
      return res.status(200).json({
        status: "success",
        message: "Delete movie successfully",
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  async updateMovie(req = new Request(), res) {
    try {
      const { name, description, length, genres, trailer, poster, release_date, dates_minium, actor, director } = req.body;
      const id = req.body.id;
      await pool.execute(`UPDATE film SET name = ?, description = ?, length = ?, genres = ?, trailer = ?, poster = ?, release_date = ?, dates_minium = ?, actor = ?, director = ? WHERE film_id = ?`, [name, description, length, genres, trailer, poster, release_date, dates_minium, actor, director, id]);
      return res.status(200).json({
        status: "success",
        message: "Update movie successfully",
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });

    }
  }


  async getPosition(req, res) {
    const film_id  = req.body.id;
    console.log(film_id)
    if (!film_id) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }
    const [movie] = await pool.execute(`SELECT cinema_room.lenght as length, cinema_room.width as width, film.poster as poster, showtime.showtime_id as id, film.name as film_name, film.length as film_length, cinema.name as cinema_name,  showtime.time as time, cinema_room.name_room as name_room from showtime inner join cinema_room on cinema_room.room_id = showtime.room_id INNER join film on film.film_id = showtime.film_id inner join cinema on cinema.cinema_id = cinema_room.cinema_id where showtime.showtime_id = ?;`, [film_id]);
    if(movie == null) {
      res.status(500).json({
        status: "không có data",
      });
    }
    const [type_chair] = await pool.execute(`SELECT room_seat.seat_type as type_chair FROM showtime inner join cinema_room on cinema_room.room_id = showtime.room_id inner join room_seat on cinema_room.room_id = room_seat.room_id where showtime.showtime_id = ?  GROUP BY(type_chair);`, [film_id]);
    const position = [];
    for(let i = 0; i < movie[0].width; i++) {
      let [row_chair] = await pool.execute(`SELECT room_seat.* from room_seat inner join showtime on showtime.room_id = room_seat.room_id WHERE room_seat.seat_row = ? AND showtime.showtime_id = ? order by(room_seat.seat_column);`, [(i+1), film_id]);
      row_chair.map((chair) => {
        chair.status = "available";
      })
      position.push(row_chair);
      console.log(movie.length);
    }
    const [booked_seat] = await pool.execute(`SELECT room_seat.* FROM room_seat inner join showtime on showtime.room_id = room_seat.room_id inner join booked_seat on booked_seat.showtime_id = showtime.showtime_id where booked_seat.seat_id = room_seat.seat_id and showtime.showtime_id = ? ;`, [film_id]);
    booked_seat.map((booked) => {
      if(booked != null) {
        position[booked.seat_row-1][booked.seat_column-1].status = "disable";
      } 
    })
    return res.status(200).json({
      status: "success",
      data: {movie, type_chair, position}
    });
  }
  
}
module.exports = new movieController();
