const User = require("../models/User");
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
  



  // async signup(req = new Request(), res) {
  //   const { email, password, name, phone } = req.body;
  //   if (!email || !password || !name || !phone) {
  //     return res.status(400).json({
  //       status: "error",
  //       message: "Email, password, name and phone are required",
  //     });
  //   }
  //   let validateErr = validateEmail(email) || validatePassword(password);
  //   if (validateErr) {
  //     return res.status(400).json({ status: "error", message: validateErr });
  //   }
  //   try {
  //     const user = await User.findOne({ $or: [{ email }, { phone }] });
  //     if (user) {
  //       return res
  //         .status(400)
  //         .json({ status: "error", message: "User already exists" });
  //     }
  //     const newUser = new User({ email, password, name, phone });
  //     await newUser.save();
  //     return res.status(200).json({
  //       status: "success",
  //       data: { user: newUser },
  //     });
  //   } catch (error) {
  //     return res.status(503).json({
  //       status: "error",
  //       message: "Service error. Please try again later",
  //     });
  //   }
  // }


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
      // const newUser = new User({ email, password, name, phone });
      // await newUser.save();
      //await pool.execute(`INSERT INTO users (gmail, password, name, phone_number) VALUES (?, ?, ?, ?);`, [email, password, name, phone]);
      
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
        id: rows.insertId,
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

  // async changeProfile(req = new Request(), res) {
  //   const { name, phone, password, email, newPassword } = req.body;
  //   console.log(email);

  //   try {
  //     const user = await User.findOne({ email });
  //     if (user.password !== password) {
  //       return res.status(400).json({
  //         status: "error",
  //         message: "Password is incorrect",
  //       });
  //     }

  //     user.name = name;
  //     user.phone = phone;
  //     if (newPassword) {
  //       user.password = newPassword;
  //     }
  //     await user.save();

  //     return res.status(200).json({
  //       status: "success",
  //       data: { user },
  //     });
  //   }

  //   catch (error) {
  //     return res.status(503).json({
  //       status: "error",
  //       message: "Service error. Please try again later",
  //     });
  //   }
  // }

  async saveHistory(req = new Request(), res) {
    const { name, day, location, type, cinema, site, time, position, type_chair, code, email, total_showtime, order_date } = req.body;
    console.log(email);

    try {
      const user = await User.findOne({ email });
      console.log(user);
      //add history
      user.history.push({
        name: name,
        day: day,
        location: location,
        type: type,
        cinema: cinema,
        site: site,
        time: time,
        position: position,
        type_chair: type_chair,
        total_showtime: total_showtime,
        code: code,
        order_date: order_date
      });

      await user.save();


      return res.status(200).json({
        status: "success",
      });
    }
    catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  async getHistory(req = new Request(), res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      const history = user.history;
      return res.status(200).json({
        status: "success",
        data: { history }
      });
    }
    catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }



}
module.exports = new authController();
