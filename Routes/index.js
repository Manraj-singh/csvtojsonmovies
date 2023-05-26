const router = require("express").Router();

const mdbRoute = require("./movieRoute");
const pgRoute = require("./movieRoutePg");

router.use("/pg", pgRoute);
router.use("/", mdbRoute);

router.use("*", (req, res) => {
  return res.status(404).json({
    status: false,
    messag: "404 , wrong endpoint",
    //   data: " POST endpoints are: '/api/user/signup ' , '/api/user/generate-otp ' , '/api/user/verify ' ",
  });
});

module.exports = router;
