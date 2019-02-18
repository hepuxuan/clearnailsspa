const express = require("express");
const { getAvailableTimeSlot } = require("../../services/timeslot");

const router = express.Router();

router.get("/available", async (req, res) => {
  try {
    const availables = await getAvailableTimeSlot(req.query.date);
    res.json({
      availables
    });
  } catch {
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

module.exports = router;
