const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/change-profile", authController.changeProfile);
router.post("/saveHistory", authController.saveHistory);
router.post("/history", authController.getHistory);

module.exports = router;
