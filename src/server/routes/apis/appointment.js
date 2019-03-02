const express = require("express");
const {
  createAppointment,
  getAppointment
} = require("../../services/appointment");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const appointment = await createAppointment(req.body);
    res.json(appointment);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointment = await getAppointment(req.params.id);
    res.json(appointment);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

module.exports = router;
