const { Appointment, Customer, Service, Staff } = require("../models");

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
  const appointment = await Appointment.findOne({
    where: {
      id: 1
    },
    attributes: { exclude: ["ServiceId"] },
    include: [
      {
        model: Service,
        through: "AppointmentServices"
      },
      {
        model: Staff
      }
    ]
  });
  return appointment;
}

module.exports = {
  createAppointment,
  getAppointment
};
