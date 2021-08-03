const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("html");
});

module.exports = router;
