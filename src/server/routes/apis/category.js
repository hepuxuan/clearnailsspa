const express = require("express");
const { getCategories, getCategory } = require("../../services/category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.json({
      categories
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const category = await getCategory(req.params.categoryId);
    res.json(category);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

module.exports = router;
