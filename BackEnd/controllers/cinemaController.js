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

// module.exports = new cinemaController();