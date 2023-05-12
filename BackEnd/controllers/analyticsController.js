import pool from "../config/index.js";

class analysisController {
    async getAllProfit(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`SELECT
                film.*,
                count(film.film_id) as total_ticket,
                SUM(room_seat.seat_fare) AS total_revenue
            FROM
                ticket
            INNER JOIN room_seat ON ticket.chair_number = room_seat.seat_id
            INNER JOIN showtime ON ticket.showtime_id = showtime.showtime_id
            INNER JOIN film ON showtime.film_id = film.film_id
            GROUP BY
                film.film_id;`);

            // if total_revenue is null => total_revenue = 0
            rows.forEach((row) => {
                if (row.total_revenue == null) {
                    row.total_revenue = 0;
                }
                // if row.total_revenue is string => convert to number
                if (typeof row.total_revenue == "string") {
                    row.total_revenue = Number(row.total_revenue);
                }
                
            });

            // convert datesm_minium from dd/mm/yyyyThh:mm:ss to dd/mm/yyyy with dates_minium is Date type
            rows.forEach((row) => {
                row.dates_minium = row.dates_minium.toISOString().slice(0, 10);
            });

            
            // add columns status (if date_minimum < today => status = "Now Showing", else status = "Coming Soon")
            const today = new Date();
            rows.forEach((row) => {
                const dates_minium = new Date(row.dates_minium);
                if (dates_minium < today) {
                    row.status = "Now Showing";
                } else {
                    row.status = "Coming Soon";
                }
            });
            return res.status(200).json({
                status: "success",
                data: { Sales: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }
    }
}

module.exports = new analysisController();