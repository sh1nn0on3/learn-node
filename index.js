const express = require("express");
const initRoutes = require("./src/routers");
require("dotenv").config();
require("./connection_database");

const app = express();

app.use(express.json());

initRoutes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server is running on the port " + PORT);
});
