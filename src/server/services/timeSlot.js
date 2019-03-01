const { TimeSlot, Schedule, Appointment, Staff } = require("../models");
const _ = require("lodash");
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

async function getTimeSlot(id) {
  const { id, start, end, name } = await TimeSlot.findOne({
    where: {
      id
    }
  });

  return { id, start, end, name };
}

async function getAvailableTimeSlot(start, end) {
  const dates = moment.range(start, end).by("days");
  const sfaffMap = {};
  const daysTimeSlots = [];

  for (let datetime of dates) {
    const date = datetime.format("YYYY-MM-DD");
    const timeSlotsDb = await TimeSlot.findAll({
      include: [
        {
          model: Schedule,
          include: [{ model: Staff }],
          where: {
            day: moment(date).format("ddd")
          }
        },
        {
          model: Appointment,
          attributes: { exclude: ["ServiceId"] }
        }
      ]
    });
    daysTimeSlots.push({
      date,
      timeSlots: timeSlotsDb.map(({ id, start, end, name }) => ({
        id,
        start,
        end,
        name
      }))
    });
    const timeSlots = timeSlotsDb
      .map(({ id, start, end, name, Schedules, Appointments }) => ({
        id,
        start,
        end,
        name,
        schedules: Schedules,
        // filter out appointments on that day
        appointments: Appointments.filter(a => a.date === date)
      }))
      // remove from the list if all slot has been taken
      .filter(t => t.schedules.length > t.appointments.length)
      .map(({ id, start, end, name, schedules, appointments }) => ({
        id,
        start,
        end,
        name,
        staffs: schedules
          // remove slots if the staff has an appointment
          .filter(s => !appointments.find(a => s.Staff.id === a.StaffId))
          .map(({ Staff: { id, name, photo } }) => ({
            id,
            name,
            photo,
            title: "Technician"
          }))
      }));

    for (const timeSlot of timeSlots) {
      const { id, start, end, name } = timeSlot;
      for (let staff of timeSlot.staffs) {
        if (sfaffMap[staff.id]) {
          sfaffMap[staff.id].availables.push({
            id,
            name,
            start,
            end,
            date
          });
        } else {
          sfaffMap[staff.id] = {
            ...staff,
            availables: [
              {
                id,
                name,
                start,
                end,
                date
              }
            ]
          };
        }
      }
    }
  }

  return _.values(sfaffMap).map(staff => ({
    ...staff,
    availables: daysTimeSlots.map(date => ({
      date: date.date,
      timeSlots: date.timeSlots.map(({ id, name, start, end }) => ({
        id,
        name,
        start,
        end,
        isAvailable: !!staff.availables.find(
          a => id === a.id && date.date === a.date
        )
      }))
    }))
  }));
}

module.exports = {
  getAvailableTimeSlot,
  getTimeSlot
};
