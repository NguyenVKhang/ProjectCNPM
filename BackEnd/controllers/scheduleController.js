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
            const [rows] = await pool.execute(`INSERT INTO showtime (ticket_fare, time, room_id, film_id) VALUES ('${ticket_fare}', '${time}', '${room_id}', '${film_id}');`);
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