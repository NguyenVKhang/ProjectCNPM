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
            const { ticket_fare, time, room_id, film_id } = req.body;
            const [rows] = await pool.execute(`UPDATE showtime SET ticket_fare = '${ticket_fare}', time = '${time}', room_id = '${room_id}', film_id = '${film_id}' WHERE showtime_id = ${req.params.id};`);
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