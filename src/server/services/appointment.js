const { Appointment, Customer } = require("../models");

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
  return Appointment.create({
    date: request.date,
    ServiceId: request.serviceId,
    CustomerId: existingCustomer.id,
    ScheduleId: request.scheduleId
  });
}

module.exports = {
  createAppointment
};
