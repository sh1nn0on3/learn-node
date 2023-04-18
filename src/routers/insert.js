import * as controllers from "../controller";


const router = require("express").Router();

router.get("/", controllers.insertData);

// module.exports = router;
export default router;
