<<<<<<< HEAD
// const Cinema = require("../models/Cinema");

// class cinemaController {
//     async getCinema(req = new Request(), res) {
//         try {
//             const cinema = await Cinema.find({});
//             return res.status(200).json({
//                 status: "success",
//                 data: { cinema },
//             });
//         } catch (error) {
//             return res.status(503).json({
//                 status: "error",
//                 message: "Service error. Please try again later",
//             });
//         }
//     }
// }
=======
import pool from "../config/index.js";
const Cinema = require("../models/Cinema");

class cinemaController {
    // async getCinema(req = new Request(), res) {
    //     try {
    //         const cinema = await Cinema.find({});
    //         return res.status(200).json({
    //             status: "success",
    //             data: { cinema },
    //         });
    //     } catch (error) {
    //         return res.status(503).json({
    //             status: "error",
    //             message: "Service error. Please try again later",
    //         });
    //     }
    // }

    async getCinema(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`SELECT * from cinema;`);
            return res.status(200).json({
                status: "success",
                data: { cinema: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }
    }

    async getCinemaRoom(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`SELECT * from cinema JOIN cinema_room USING (cinema_id);`);
            return res.status(200).json({
                status: "success",
                data: { cinema: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }
    }
}
>>>>>>> 0686600a56c27a6efad6799d0bd76346e1c83038

// module.exports = new cinemaController();