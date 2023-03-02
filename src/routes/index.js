const authRouter = require("./auth.routes");
const observationsRouter = require("./observations.routes");


//Para mayor comodidad y organizacion, se crea un index para agrupar las rutas y no tenerlas en el app
const routerApi = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/observations", observationsRouter);
};

module.exports = routerApi;