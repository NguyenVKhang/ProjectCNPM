const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getAllAdmins", adminController.getAllAdmins);

module.exports = router;
