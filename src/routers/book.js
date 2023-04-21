// const user = require("../controller/user");

import * as controllers from "../controller";
import verifyToken from "../middlewares/verify_token";

const router = require("express").Router();

// PUBLIC ROUTER
router.get("/",controllers.getBook)


// PRIVATE ROUTER 
router.get("/",verifyToken, controllers.getCurrent);

router.get("/v1", (req, res) => {
  return res.send(`V1`);
});

// module.exports = router;
export default router;
