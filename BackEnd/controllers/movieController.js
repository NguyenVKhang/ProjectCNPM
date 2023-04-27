const MovieNowShowing = require("../models/MovieNowShowing");
const MovieComingSoon = require("../models/MovieComingSoon");
const axios = require("axios");

class movieController {
  async getMoviesNowShowing(req = new Request(), res) {
    try {
      const moviesNowShowing = await MovieNowShowing.find({});
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


  async getDetailMovieNowShowing(req = new Request(), res) {
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
}

module.exports = new movieController();
