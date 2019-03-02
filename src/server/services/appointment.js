const {
  Appointment,
  Customer,
  Service,
  Staff,
  TimeSlot
} = require("../models");
const { convert: convertStaff } = require("./staff");
const { convert: convertService } = require("./service");

async function createAppointment(request) {
  let existingCustomer = await Customer.findOne({
    where: {
      phone: request.phone
    }
  });
  if (existingCustomer) {
    await existingCustomer.update({
      phone: request.phone || existingCustomer.phone,
      email: request.email || existingCustomer.email,
      name: request.name || existingCustomer.name
    });
  } else {
    existingCustomer = await Customer.create({
      phone: request.phone,
      email: request.email,
      name: request.name
    });
  }

  const appointmentDB = await Appointment.create({
    date: request.date,
    CustomerId: existingCustomer.id,
    TimeSlotId: request.timeSlotId,
    StaffId: request.staffId
  });

  const services = await Service.findAll({
    where: {
      id: request.services
    }
  });

  await appointmentDB.addServices(services);

  return {
    id: appointmentDB.id
  };
}

async function getAppointment(id) {
  const res = await Appointment.findOne({
    where: {
      id
    },
    attributes: { exclude: ["ServiceId"] },
    include: [
      {
        model: Service,
        through: "AppointmentServices"
      },
      {
        model: Staff
      },
      {
        model: TimeSlot
      },
      {
        model: Customer
      }
    ]
  });
  return {
    id: res.id,
    date: res.date,
    staff: convertStaff(res.Staff),
    services: res.Services.map(s => convertService(s)),
    timeSlot: res.TimeSlot,
    customer: res.Customer
  };
}

module.exports = {
  createAppointment,
  getAppointment
};
