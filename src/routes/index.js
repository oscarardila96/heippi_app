const authRouter = require("./auth.routes");
const observationsRouter = require("./observations.routes");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/observations", observationsRouter);
};

module.exports = routerApi;