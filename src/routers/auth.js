// const user = require("../controller/user");
import * as controller from "../controller";
import express from "express";
// const router = require("express").Router();

const router = express.Router();

router.post("/register", controller.register);

// module.exports = router;
export default router;
