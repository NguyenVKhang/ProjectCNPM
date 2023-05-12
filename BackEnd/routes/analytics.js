const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/getAllProfit", analyticsController.getAllProfit);
router.get("/getAllTicket", analyticsController.getAllTicket);

module.exports = router;
