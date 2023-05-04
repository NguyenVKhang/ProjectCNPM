const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

router.get("/getAllSchedules", scheduleController.getAllSchedules);
router.get("/getScheduleById/:id", scheduleController.getScheduleById);
router.post("/postSchedule", scheduleController.postSchedule);
router.post("/deleteSchedule", scheduleController.deleteSchedule);
router.post("/updateSchedule", scheduleController.updateSchedule);

module.exports = router;
