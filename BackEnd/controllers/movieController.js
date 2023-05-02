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
      const [moviesNowShowing, fields] = await pool.execute('SELECT * FROM film');

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
      const moviesComingSoon = await MovieComingSoon.find({});
      console.log(moviesComingSoon);
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

  async getMovieByName(req = new Request(), res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Name is required",
      });
    }
    try {
      const movie = await MovieNowShowing.findOne({
        name
      });
      if (!movie) {
        return res
          .status(400)
          .json({ status: "error", message: "Movie does not exist" });
      }


      const currentDay = new Date()
      const date = movie.Date.filter((Date) => Date.day.getTime() > currentDay.getTime() || Date.day.getDate() === currentDay.getDate()).map((Date) => {
        const day = Date.day;
        const id = Date.id;
        const Location = Date.Location.map((Location) => {
          const place = Location.place;
          const id = Location.id;
          const Movie_Type = Location.Movie_Type.map((Movie_Type) => {
            const type_name = Movie_Type.type_name;
            const id = Movie_Type.id;
            const Cinema = Movie_Type.Cinema.map((Cinema) => {
              const cinema_name = Cinema.cinema_name;
              const id = Cinema.id;
              const Site = Cinema.Site.map((Site) => {
                const site_name = Site.site_name;
                const id = Site.id;
                const Time = Site.Time.filter((Time) => {
                  return Time.timeSt.getTime() >= currentDay.getTime();
                }).map((Time2) => {
                  const timeSt = Time2.timeSt;
                  const id = Time2.id;
                  return { timeSt, id };
                });
                return { site_name, id, Time };
              });
              return { cinema_name, id, Site };
            });
            return { type_name, id, Cinema };
          });
          return { place, id, Movie_Type };
        });
        return { day, id, Location };
      });


      return res.status(200).json({
        status: "success",
        data: { date }
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
  async getPosition(req = new Request(), res) {
    const { name, day, location, type, cinema, site, time } = req.body;
    if (!name || !day || !location || !type || !cinema || !site || !time) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }
    try {
      const movie = await MovieNowShowing.findOne({
        name
      });
      if (!movie) {
        return res
          .status(400)
          .json({ status: "error", message: "Movie does not exist" });
      }
      const total_showtime = movie.time;

      const date = new Date(day);
      const timest = new Date(time);

      const image = movie.image;
      const type_chair = movie.Date.find((Date) => Date.day.getTime() === date.getTime()).Location.find((Location) => Location.place === location).Movie_Type.find((Movie_Type) => Movie_Type.type_name === type).Cinema.find((Cinema) => Cinema.cinema_name === cinema).Site.find((Site) => Site.site_name === site).Time.find((Time) => Time.timeSt.getTime() === timest.getTime()).Type_Chair;
      const position = movie.Date.find((Date) => Date.day.getTime() === date.getTime()).Location.find((Location) => Location.place === location).Movie_Type.find((Movie_Type) => Movie_Type.type_name === type).Cinema.find((Cinema) => Cinema.cinema_name === cinema).Site.find((Site) => Site.site_name === site).Time.find((Time) => Time.timeSt.getTime() === timest.getTime()).Position;
      return res.status(200).json({
        status: "success",
        data: { position, name, day, location, type, cinema, site, time, type_chair, total_showtime, image }
      });

    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

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
  
  
}
module.exports = new movieController();
