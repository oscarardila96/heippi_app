const express = require("express");
const cors = require("cors");
const error = require("./middlewares/error.middleware");
const initModels = require("./models/init.models");
const routerApi = require("./routes");
const db = require("./utils/database");


//Se inicializa express, las rutas, los modelos y el middleware de error
const app = express();
app.use(cors());
app.use(express.json());
routerApi(app);
initModels();
app.use(error);

//Se sincroniza base de datos para agregar y quitar cambios en modelos y datos existentes
db.sync({ force: false })
  .then(() => console.log("Database synchronized"))
  .catch(error => console.log(error))

module.exports = app;