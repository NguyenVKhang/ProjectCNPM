const express = require("express");
const router = express.Router();
const cinemaController = require("../controllers/cinemaController");

router.get("/getAllCinema", cinemaController.getCinema);
router.get("/getAllCinemaRoom", cinemaController.getCinemaRoom);

module.exports = router;