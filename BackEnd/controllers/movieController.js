const MovieNowShowing = require("../models/MovieNowShowing");
const MovieComingSoon = require("../models/MovieComingSoon");
const axios = require("axios");
import pool from "../config/index.js";
class movieController {
  // async getMoviesNowShowing(req = new Request(), res) {
  //   try {
  //     const moviesNowShowing = await MovieNowShowing.find({});
  //     return res.status(200).json({
  //       status: "success",
  //       data: { moviesNowShowing },
  //     });
  //   } catch (error) {
  //     return res.status(503).json({
  //       status: "error",
  //       message: "Service error. Please try again later",
  //     });
  //   }
  // }
// use mysql
  async getMoviesNowShowing(req = new Request(), res) {
    try {
      const [moviesNowShowing, fields] = await pool.execute('SELECT * FROM film where dates_minium < now()');

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

  async getMovieByCinplex(req = new Request(), res) {
    const { cinplex, place } = req.body;
    const movie = await MovieNowShowing.find({});
    //filter movie by date 23/02/2023 have place in HCM

    const date = new Date(2023, 1, 23);

    const movieByCinplex = movie.filter((movie) => {
      return movie.Date.some((Date) => {
        return Date.day.getTime() === date.getTime() && Date.Location.some((Location) => {
          return Location.place === place && Location.Movie_Type.some((Movie_Type) => {
            return Movie_Type.Cinema.some((Cinema) => {
              return Cinema.cinema_name === cinplex;
            })
          })
        })
      })
    }).map((Movie) => {
      const name = Movie.name;
      const image = Movie.image;
      const itemRate = Movie.itemRate;
      const day = Movie.Date.find((Date) => {
        return Date.day.getTime() === date.getTime();
      }).day

      const location = Movie.Date.find((Date) => {
        return Date.day.getTime() === date.getTime();
      }).Location.find((Location) => {
        return Location.place === place;
      }).place

      const type = Movie.Date.find((Date) => {
        return Date.day.getTime() === date.getTime();
      }).Location.find((Location) => {
        return Location.place === place;
      }).Movie_Type.filter((Movie_Type) => {
        return Movie_Type.Cinema.some((Cinema) => {
          return Cinema.cinema_name === cinplex;
        })
      }).map((Movie_Type) => {
        return {
          type_name: Movie_Type.type_name,
          Cinema: Movie_Type.Cinema.filter((Cinema) => {
            return Cinema.cinema_name === cinplex;
          }
          )
        }
      })


      const cinema = Movie.Date.find((Date) => {
        return Date.day.getTime() === date.getTime();
      }).Location.find((Location) => {
        return Location.place === place;
      }).Movie_Type.find((Movie_Type) => {
        return Movie_Type.Cinema.some((Cinema) => {
          return Cinema.cinema_name === cinplex;
        })
      }).Cinema.find((Cinema) => {
        return Cinema.cinema_name === cinplex;
      }).cinema_name

      return { name, image, itemRate, day, location, type, cinema };

    })

    console.log(movieByCinplex)


    return res.status(200).json({
      status: "success",
      data: { movieByCinplex }
    });
  }


  // async getDetailMovieNowShowing(req = new Request(), res) {
  //   const { name } = req.body;
  //   if (!name) {
  //     return res.status(400).json({
  //       status: "error",
  //       message: "Name is required",
  //     });
  //   }
  //   try {
  //     const movie = await MovieNowShowing.findOne({
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
      const month = movie[0].dates_minium.getMonth();
      const day = movie[0].dates_minium.getDate();

      // const date = new Date(year, month, day);
      movie[0].dates_minium = day + "-" + month + "-" + year;
      // console.log(movie[0].dates_minium)
      // movie[0].dates_minium = date;
      
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

  async getDetailMovieComingSoon(req = new Request(), res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Name is required",
      });
    }
    try {
      const movie = await MovieComingSoon.findOne({
        name
      });
      if (!movie) {
        return res
          .status(400)
          .json({ status: "error", message: "Movie does not exist" });
      }
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

  /** */
  

  async getMiddle(req, res) {
    try {
      const response = await axios.get('https://api.web2m.com/historyapimomo/f8302be90a2b90a9a2882c-667c-c240-b57a-6a4a48d70e0d');
      const data = response.data.momoMsg.tranList;

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
    const { name, day, location, type, cinema, site, time, position } = req.body;
    const movie = await MovieNowShowing.findOne({
      name
    });


    const date = new Date(day);
    const timest = new Date(time);

    const Position = movie.Date.find((Date) => Date.day.getTime() === date.getTime()).Location.find((Location) => Location.place === location).Movie_Type.find((Movie_Type) => Movie_Type.type_name === type).Cinema.find((Cinema) => Cinema.cinema_name === cinema).Site.find((Site) => Site.site_name === site).Time.find((Time) => Time.timeSt.getTime() === timest.getTime()).Position;

    //update status of position
    Position.forEach((pos) => {
      pos.forEach((q) => {
        position.forEach((p) => {
          if (q.position === p) {
            q.status = "disable";
          }
        })
      })
    })

    await movie.save();
    return res.status(200).json({
      status: "success",
    });
  }


  async updateStatusEmpty(req = new Request(), res) {
    const { name, day, location, type, cinema, site, time, position, type_chair } = req.body;
    const movie = await MovieNowShowing.findOne({
      name
    });

    const date = new Date(day);
    const timest = new Date(time);

    const Position = movie.Date.find((Date) => Date.day.getTime() === date.getTime()).Location.find((Location) => Location.place === location).Movie_Type.find((Movie_Type) => Movie_Type.type_name === type).Cinema.find((Cinema) => Cinema.cinema_name === cinema).Site.find((Site) => Site.site_name === site).Time.find((Time) => Time.timeSt.getTime() === timest.getTime()).Position;

    //update status of position
    Position.forEach((pos) => {
      pos.forEach((q) => {
        position.forEach((p) => {
          if (q.position === p) {
            q.status = type_chair;
          }
        })
      })
    })

    await movie.save();


    return res.status(200).json({
      status: "success",
    });
  }

  // async getShowTime(req, res) {
  //   const  name  = req.params.name;
  //     const currentDay = new Date()
  //     let date = [];
  //     for(let i = 0; i < 20; i++) {
  //       let currentDate = new Date();
  //       currentDate.setDate(currentDate.getDate() + i);
  //       let [cinema_data] = await pool.execute(`SELECT cinema.name as name, cinema.cinema_id as id from cinema inner join cinema_room on cinema_room.cinema_id = cinema.cinema_id inner join showtime on showtime.room_id = cinema_room.room_id inner join film on film.film_id = showtime.film_id where film.name = "Người Kiến Và Chiến Binh Ong" and cast(showtime.time as date) = '20230501' GROUP BY(cinema.name);`);
  //       let cinemas = cinema_data.map(async (cinema) => {
  //         let cinema_name = cinema.name;
  //         let id = cinema.id;
  //         let [cinema_room] = await pool.execute('SELECT room_id, name_room FROM cinema_room where cinema_id = ?;', [id]);
  //         let sites = cinema_room.map(async (room) => {
  //           let id = room.room_id;
  //           let site_name = room.name_room;
  //           let [times]  = await pool.execute('SELECT Time(showtime.time) as time, showtime.showtime_id as id FROM showtime inner join film on film.film_id = showtime.film_id where film.name = ? and showtime.room_id = ?;', [name, id]);
  //           let Time = times.map(async (time) => {
  //             let id = time.id;
  //             let timeSt = time.time;
  //             return {id, timeSt};
  //           })
  //           return {id, site_name, Time}
  //         })
  //         return {cinema_name, id, site: sites};
  //       })
  //       let types = [];
  //       let type = {id: 1, type_name: "2D Phụ đề tiếng anh", Cinema: cinemas};
  //       types.push(type);
  //       let locations = [];
  //       let location = {id: 1, place: "Hà nội", Movie_Type: types};
  //       locations.push(location);
  //       let datei = {id: i, day: currentDate, Location: locations};
  //       date.push(datei);
  //     }
  //     return res.status(200).json({
  //       status: "success",
  //       data: { date: date }
  //     });
  //   } catch (error) {
  //     return res.status(503).json({
  //       status: "error",
  //       message: "Service error. Please try again later",
  //     });
  //   }
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
      // const year = movie[0].dates_minium.getFullYear();
      // const month = movie[0].dates_minium.getMonth();
      // const day = movie[0].dates_minium.getDate();

      // // const date = new Date(year, month, day);
      // movie[0].dates_minium = day + "-" + month + "-" + year;

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
    console.log(req.body)
    
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

  // try {
//     const id = req.body.id;
//     await pool.execute(`DELETE FROM users WHERE user_id = ${id};`);
//     return res.status(200).json({
//         status: "success",
//         message: "Delete user successfully",
//     });
// } catch (error) {
//     return res.status(503).json({
//         status: "error",
//         message: "Service error. Please try again later",
//     });
// }
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
    console.log(req.body);
    console.log(`------------`);
    const film_id  = req.body.id;
    if (!film_id) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }
    const [movie] = await pool.execute(`SELECT cinema_room.lenght as length, cinema_room.width as width, film.poster as poster, showtime.showtime_id as id, film.name as film_name, film.length as film_length, cinema.name as cinema_name,  showtime.time as time, cinema_room.name_room as name_room from showtime inner join cinema_room on cinema_room.room_id = showtime.room_id INNER join film on film.film_id = showtime.film_id inner join cinema on cinema.cinema_id = cinema_room.cinema_id where showtime.showtime_id = ?;`, [film_id]);
    const [type_chair] = await pool.execute(`SELECT room_seat.seat_type as type_chair FROM showtime inner join cinema_room on cinema_room.room_id = showtime.room_id inner join room_seat on cinema_room.room_id = room_seat.room_id where showtime.showtime_id = ?  GROUP BY(type_chair);`, [film_id]);
    const position = [];
    for(let i = 0; i < movie[0].width; i++) {
      let [row_chair] = await pool.execute(`SELECT room_seat.* from room_seat inner join showtime on showtime.room_id = room_seat.room_id WHERE room_seat.seat_row = ? AND showtime.showtime_id = ?;`, [(i+1), film_id]);
      row_chair.map((chair) => {
        chair.status = "available";
      })
      position.push(row_chair);
      console.log(movie.length);
    }
    const [booked_seat] = await pool.execute(`SELECT room_seat.* FROM room_seat inner join showtime on showtime.room_id = room_seat.room_id inner join booked_seat on booked_seat.showtime_id = showtime.showtime_id where booked_seat.seat_id = room_seat.seat_id and showtime.showtime_id = ?;`, [film_id]);
    booked_seat.map((booked) => {
      if(booked != null) {
        position[booked.seat_column-1][booked.seat_row-1].status = "disable";
      } 
    })
    return res.status(200).json({
      status: "success",
      data: {movie, type_chair, position}
    });
  }
  
}
module.exports = new movieController();
