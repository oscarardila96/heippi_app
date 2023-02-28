const patientsRouter = require("./patients.routes");
const doctorsRouter = require("./doctors.routes");
const hospitalsRouter = require("./hospitals.routes");
const authRouter = require("./auth.routes");
const observationsRouter = require("./observations.routes");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/patients", patientsRouter);
  app.use("/api/v1/doctors", doctorsRouter);
  app.use("/api/v1/hospitals", hospitalsRouter);
  app.use("/api/v1/observations", observationsRouter);
};

module.exports = routerApi;