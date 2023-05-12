import pool from "../config/index.js";

class scheduleController {
    async getAllSchedules(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`SELECT * from showtime;`);
            

            
            return res.status(200).json({
                status: "success",
                data: { schedule: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }
    }

    async getAllFeatureSchedules(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`
            SELECT *, film.name as film_name
            FROM
                showtime
            INNER JOIN film on
                showtime.film_id = film.film_id
            INNER JOIN cinema_room ON
                showtime.room_id = cinema_room.room_id
            INNER JOIN cinema ON
                cinema_room.cinema_id = cinema.cinema_id`
            );
            // convert dates_minium convert yyyy-mm-ddThh:mm:ss.000Z to yyyy-mm-dd hh:mm:ss
            rows.forEach((row) => {
                if (row.time != "Invalid Date")

                {
                    row.time = row.time.toISOString().slice(0, 19).replace('T', ' ');                    
                }
            });


            return res.status(200).json({
                status: "success",
                data: { schedule: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }
    }

    async getScheduleById(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`SELECT * from showtime where showtime_id = ${req.params.id};`);
            return res.status(200).json({
                status: "success",
                data: { schedule: rows[0] },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });

        }
    }

    async postSchedule(req = new Request(), res) {
        try {
            const { ticket_fare, time, room_id, film_id } = req.body;
            const [rows] = await pool.execute(`SELECT * from cinema_room where room_id = ${room_id};`);
            if (rows.length === 0) {
                return res.status(400).json({
                    status: "error",
                    message: "Room is not available",
                });
            }
            
            // check if film_id is not available
            const [rows2] = await pool.execute(`SELECT * from film where film_id = ${film_id};`);
            if (rows2.length === 0) {
                return res.status(400).json({
                    status: "error",
                    message: "Film is not available",
                });
            }

            // Check if there is a showtime in the same room and time within 2 hours.
            // Time2 = time + 2 hours
            // Time3 = time - 2 hours
            // Format time: 2021-05-05 12:00:00

            var time2 = new Date(new Date(time).getTime() + 2 * 60 * 60 * 1000);
            var time3 = new Date(new Date(time).getTime() - 2 * 60 * 60 * 1000);
            // toISOString() and convert to GMT+7
            time2 = new Date(time2.getTime() + 7 * 60 * 60 * 1000);
            time3 = new Date(time3.getTime() + 7 * 60 * 60 * 1000);

            const [rows3] = await pool.execute(`
            SELECT * FROM showtime
            WHERE room_id = ${room_id} AND time < '${time2.toISOString().slice(0, 19).replace('T', ' ')}' AND time > '${time3.toISOString().slice(0, 19).replace('T', ' ')}'
            `);

            if (rows3.length !== 0) {
            return res.status(400).json({
                status: "error",
                message: "There is a showtime in the same room and time within 2 hours",
            });
            }



            const [rows4] = await pool.execute(`INSERT INTO showtime (ticket_fare, time, room_id, film_id) VALUES ('${ticket_fare}', '${time}', '${room_id}', '${film_id}');`);
            return res.status(200).json({
                status: "success",
                data: { schedule: rows4 },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });

        }
    }

    async deleteSchedule(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`DELETE FROM showtime WHERE showtime_id = ${req.body.id};`);
            return res.status(200).json({
                status: "success",
                data: { schedule: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });

        }
    }

    async updateSchedule(req = new Request(), res) {
        try {
            const {id, date, room_id, film_id } = req.body;

            const ticket_fare = req.body.ticket_fare || 0;
            const [rows] = await pool.execute(`UPDATE showtime SET ticket_fare = '${ticket_fare}', time = '${date}', room_id = '${room_id}', film_id = '${film_id}' WHERE showtime_id = ${id};`);
            return res.status(200).json({
                status: "success",
                data: { schedule: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }

        }
}

module.exports = new scheduleController();