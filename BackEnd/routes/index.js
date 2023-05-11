const loginRouter = require("./auth");
const movieRouter = require("./movie");
const cinemaRouter = require("./cinema");
const userRouter = require("./user");
const adminRouter = require("./admin");
const scheduleRouter = require("./schedule");
const analyticsRouter = require("./analytics");

function route(app) {
  app.use("/auth", loginRouter);
  app.use("/movie", movieRouter);
  app.use("/cinema", cinemaRouter);
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
  app.use("/schedule", scheduleRouter);
  app.use("/analytics", analyticsRouter);
}

module.exports = route;
