const patientsRouter = require("./patients.routes");
const doctorsRouter = require("./doctors.routes");
const hospitalsRouter = require("./hospitals.routes");


const routerApi = (app) => {
  app.use("/api/v1/patients", patientsRouter);
  app.use("/api/v1/doctors", doctorsRouter);
  app.use("/api/v1/hospitals", hospitalsRouter);
};

module.exports = routerApi;