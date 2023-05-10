// const User = require("../models/User");
const { validatePassword, validateEmail } = require("../utils/validates");
import pool from "../config/index.js";
class authController {
  async login(req = new Request(), res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }
    let validateErr = validateEmail(email) || validatePassword(password);
    if (validateErr) {
      return res.status(400).json({ status: "error", message: validateErr });
    }
    try {
      
      const [rows] = await pool.execute(`SELECT * from users where gmail = ? and password = ?;`, [email, password]);
      if (rows.length === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "User does not exist" });
      }
      if (rows[0].password !== password) {
        return res
          .status(400)
          .json({ status: "error", message: "Password is incorrect" });
      }
      return res.status(200).json({
        status: "success",
        data: { user: rows[0] },
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  async loginAdmin(req = new Request(), res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }
    let validateErr = validateEmail(email) || validatePassword(password);
    if (validateErr) {
      return res.status(400).json({ status: "error", message: validateErr });
    }
    try {
      
      const [rows] = await pool.execute(`SELECT * from employee where gmail = ? and password = ?;`, [email, password]);
      if (rows.length === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "Employee does not exist" });
      }
      if (rows[0].password !== password) {
        return res
          .status(400)
          .json({ status: "error", message: "Password is incorrect" });
      }
      return res.status(200).json({
        status: "success",
        data: { user: rows[0] },
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  async signup(req = new Request(), res) {
    const { email, password, name, phone } = req.body;
    if (!email || !password || !name || !phone) {
      return res.status(400).json({
        status: "error",
        message: "Email, password, name and phone are required",
      });
    }
    let validateErr = validateEmail(email) || validatePassword(password);
    if (validateErr) {
      return res.status(400).json({ status: "error", message: validateErr });
    }
    try {
      const [rows] = await pool.execute(`SELECT * from users where gmail = ? or phone_number = ?;`, [email, phone]);
      if (rows.length !== 0) {
        return res
          .status(400)
          .json({ status: "error", message: "User already exists" });
      }

      const [row] = await pool.execute(`INSERT INTO users (gmail, password, name, phone_number) VALUES (?, ?, ?, ?);`, [email, password, name, phone]);
      const newUser = {
        id: row.insertId,
        gmail: email,
        password: password,
        name: name,
        phone_number: phone
      }

      return res.status(200).json({
        status: "success",
        data: { user: newUser },
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  async changeProfile(req = new Request(), res) {
   
    const { name, phone, sex, date_of_birth, city, address, password, email, newPassword} = req.body;
    console.log(req.body);
    try {
      const [row] = await pool.execute(`SELECT * FROM users WHERE gmail = ?;`, [email])
      
      if (row.length === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "User not exists" });
      }
      if (row[0].password != password) {
        return res
          .status(400)
          .json({ status: "error", message: "Sai mat khau" });
      }
      
      const [rows] = await pool.execute(`UPDATE users
      SET name = ?, phone_number = ?, sex = ?, date_of_birth = ?, city = ?, address = ?, password = ?
      WHERE gmail = ?;`, [name, phone, sex, date_of_birth, city, address, newPassword, email])
      const newData = {
        user_id: rows.insertId,
        gmail: email,
        password: password,
        name: name,
        phone_number: phone,
        sex: sex, 
        date_of_birth: date_of_birth,
        city: city,
        address: address,
      }
      return res.status(200).json({
        status: "success",
        data: {user: newData}
      });
    }
    catch (error) {
      return res.status(503).json({
              status: "error",
              message: "Service error. Please try again later",
            });
    }
  }

  async saveHistory(req = new Request(), res) {
    const { user_id, showtime_id, position_booked, room_id } = req.body;
    console.log(req.body);
    console.log(`----------------------`);
    try {
      const date = new Date();
      const promises = position_booked.map(async (p) => {
        const [rows] = await pool.execute(`INSERT INTO ticket (chair_number, user_id, showtime_id, payment_time) VALUES ((SELECT seat_id from room_seat WHERE room_id = ? and seat_name = ?), ?, ?, ?);`, [room_id, p, user_id, showtime_id, date]);
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

  async getHistory(req = new Request(), res) {
    const {user_id} = req.body;
    console.log(req.body);
    console.log(`--------------------`);
    const [rows] = await pool.execute(`SELECT cinema.name as cinema_name, ticket.payment_time as order_date, film.name as film_name, film.length as film_length, showtime.time as time, cinema_room.name_room as name_room, room_seat.seat_name as seat_name, ticket.ticket_id as ticket_id from ticket inner join showtime on showtime.showtime_id = ticket.showtime_id inner join film on film.film_id = showtime.film_id inner join room_seat on ticket.chair_number = room_seat.seat_id inner join cinema_room on cinema_room.room_id = showtime.room_id inner join cinema on cinema_room.cinema_id = cinema.cinema_id where ticket.user_id = ? order by(time) desc;`, [user_id]);
    return res.status(200).json({
      status: "success",
      data: rows
    })
  }



}
module.exports = new authController();
