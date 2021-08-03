const router = require("express").Router();
const emojis = require("../latinx-emojis.json");

router.get("/", (req, res) => {
  res.json(emojis);
});

router.get("/category/:category", (req, res) => {
  const categoryEmojis = emojis.filter((emoji) => emoji.category === req.params.category);

  res.json(categoryEmojis);
});

router.get("/:name", (req, res) => {
  const nameEmojis = emojis.filter((emoji) => emoji.name === req.params.name);

  res.json(nameEmojis);
});

module.exports = router;
