const loginRouter = require("./auth");
const movieRouter = require("./movie");
const cinemaRouter = require("./cinema");

function route(app) {
  app.use("/auth", loginRouter);
  app.use("/movie", movieRouter);
  app.use("/cinema", cinemaRouter);
}

module.exports = route;
