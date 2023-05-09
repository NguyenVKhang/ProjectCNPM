import pool from "../config/index.js";

class adminController {
    async getAllAdmins(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`SELECT * from users;`);
            return res.status(200).json({
                status: "success",
                data: { employee: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }
    }
}

module.exports = new adminController();