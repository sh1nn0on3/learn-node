// import router from "./user";
import user from "./user";
import auth from "./auth";
import { notFound } from "../middlewares/handle_errors";

const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);

  // return app.use("/", (req, res) => {
  //   return res.send("server on ....");
  // });

  app.use(notFound);
};

module.exports = initRoutes;
