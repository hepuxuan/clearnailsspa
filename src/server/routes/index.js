const express = require("express");
const router = express.Router();
const {
  Schedule,
  Service,
  Appointment,
  Customer,
  Staff
} = require("../models");

/* GET home page. */
router.get("/", async (req, res, next) => {
  // test db models
  const [schedules, services, appointments] = await Promise.all([
    Schedule.findAll({
      include: [{ model: Staff }]
    }),
    Service.findAll(),
    Appointment.findAll({
      include: [{ model: Service }, { model: Staff }, { model: Customer }]
    })
  ]);
  res.render("index", {
    title: "Clear Nails Spa",
    serverData: JSON.stringify({ schedules, services, appointments })
  });
});

module.exports = router;
