const Sequelize = require("sequelize");
const { TimeSlot, Schedule, Appointment, Staff } = require("../models");
const moment = require("moment");

const Op = Sequelize.Op;

async function getAvailableTimeSlot(date) {
  const appointments = await Appointment.findAll({
    where: {
      date: new Date(date)
    }
  });
  const appointmentDates = appointments
    .map(appointment => appointment.id)
    .join(",");
  const schedules = await Schedule.findAll({
    include: [
      {
        model: Staff
      },
      {
        model: TimeSlot
      },
      {
        model: Appointment
      }
    ],
    where: appointmentDates
      ? {
          day: moment(date).format("ddd"),
          [Op.and]: [
            Sequelize.literal(`Appointment.id not in (${appointmentDates})`)
          ]
        }
      : {
          day: moment(date).format("ddd")
        }
  });

  return schedules.map(({ id, day, Staff, TimeSlot }) => ({
    id,
    day,
    staff: Staff,
    timeSlot: TimeSlot
  }));
}

module.exports = {
  getAvailableTimeSlot
};
