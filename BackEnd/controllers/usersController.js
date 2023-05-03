import pool from "../config/index.js";

class usersController {
    async getAllUsers(req = new Request(), res) {
        try {
            const [rows] = await pool.execute(`SELECT * from users;`);
            return res.status(200).json({
                status: "success",
                data: { users: rows },
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }
    }

    async deleteUser(req = new Request(), res) {
        try {
            const id = req.body.id;
            await pool.execute(`DELETE FROM users WHERE user_id = ${id};`);
            return res.status(200).json({
                status: "success",
                message: "Delete user successfully",
            });
        } catch (error) {
            return res.status(503).json({
                status: "error",
                message: "Service error. Please try again later",
            });
        }
    }
}

module.exports = new usersController();