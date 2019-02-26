const express = require("express");
const { getService, getServices } = require("../../services/service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.query.categoryId) {
      res.status(400).json({
        err: "categoryId is missing"
      });
    }
    const services = await getServices(req.query.categoryId);
    res.json({
      services
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const service = await getService(req.params.id);
    res.json(service);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

module.exports = router;
