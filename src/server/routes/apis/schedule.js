const express = require("express");
const { getAvailableTimeSlot } = require("../../services/timeSlot");

const router = express.Router();

router.get("/available", async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      res.status(400).json({
        err: "start or end is missing"
      });
    }
    const staffs = await getAvailableTimeSlot(start, end);
    res.json({
      staffs
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

module.exports = router;
