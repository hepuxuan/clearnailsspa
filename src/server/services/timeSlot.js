const { TimeSlot, Schedule, Appointment, Staff } = require("../models");
const moment = require("moment");
const _ = require("lodash");

async function getAvailableTimeSlot(date) {
  // step1: get all appointments on that day
  const appointments = await Appointment.findAll({
    where: {
      date: date
    }
  });
  const appointmentDates = appointments.map(appointment => appointment.id);

  // step2: get all schedules on that day
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
    where: {
      day: moment(date).format("ddd")
    }
  });

  // step3: filter schedules that have appointments
  const availableSchedules = schedules.filter(
    schedule =>
      !schedule.Appointments.find(a => appointmentDates.includes(a.id))
  );

  return availableSchedules.map(({ id, day, Staff, TimeSlot }) => ({
    id,
    day,
    staff: Staff,
    timeSlot: TimeSlot
  }));
}

async function getAvailableDaysInNext2Weeks() {
  const list = _.range(14).map(i =>
    moment()
      .add(i, "days")
      .format("YYYY-MM-DD")
  );

  const result = await Promise.all(
    list.map(date => getAvailableTimeSlot(date))
  );

  return list.filter((_, index) => !!result[index].length);
}

module.exports = {
  getAvailableTimeSlot,
  getAvailableDaysInNext2Weeks
};
