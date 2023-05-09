// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

<<<<<<< HEAD
// const CinemaSchema = new Schema({
//     province: {
//         type: String,
//         required: true,
//     },
//     cinema: [
//         {
//             id: {
//                 type: Number,
//                 required: true,
//             },
//             cinema_name: {
//                 type: String,
//                 required: true,
//             }
//         }
//     ]
// });
=======
const CinemaSchema = new Schema({
    province: {
        type: String,
        required: true,
    },
    cinema: [
        {
            id: {
                type: Number,
                required: true,
            },
            room_name: {
                type: String,
                required: true,
            },
            cinema_name: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            }
        }
    ]
});
>>>>>>> 0686600a56c27a6efad6799d0bd76346e1c83038

// module.exports = mongoose.model("cinema", CinemaSchema);

