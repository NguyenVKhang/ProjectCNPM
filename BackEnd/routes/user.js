const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/getAllUsers", usersController.getAllUsers);
router.post("/deleteUser", usersController.deleteUser);

module.exports = router; 
