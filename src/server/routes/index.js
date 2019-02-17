const express = require("express");
const router = express.Router();
const { getCategories } = require("../services/category");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const categories = await getCategories();
  res.render("index", {
    title: "Clear Nails Spa",
    serverData: JSON.stringify({ categories })
  });
});

module.exports = router;
