const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("cinema", CinemaSchema);


