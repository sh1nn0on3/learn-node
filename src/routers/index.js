const router = require("./user");

const initRoutes = (app) => {
  app.use("/demo", router);

  return app.use("/", (req, res) => {
    return res.send("server on ...");
  });
};

module.exports = initRoutes;
