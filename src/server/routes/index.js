const express = require("express");
const router = express.Router();
const { getCategories } = require("../services/category");
const { getAvailableDaysInNext2Weeks } = require("../services/timeSlot");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const categories = await getCategories();
  const availableDates = await getAvailableDaysInNext2Weeks();
  res.render("index", {
    title: "Clear Nails Spa",
    serverData: JSON.stringify({ categories, availableDates })
  });
});

module.exports = router;
