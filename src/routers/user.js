// const user = require("../controller/user");

const { getUser } = require("../controller/user");

const router = require("express").Router();

router.get("/", getUser);

router.get("/v1", (req, res) => {
  return res.send(`V1`);
});

// module.exports = router;
export default router;
