const express = require("express");
const cors = require("cors");
const error = require("./middlewares/error.middleware");
const initModels = require("./models/init.models");
const routerApi = require("./routes");
const db = require("./utils/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(error);
routerApi(app);

initModels();

db.sync({ force: false })
  .then(() => console.log("OK"))
  .catch(error => console.log(error))

module.exports = app;