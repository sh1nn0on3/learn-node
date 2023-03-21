const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  return res.send("server on ...");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server is running on the port " + PORT);
});
