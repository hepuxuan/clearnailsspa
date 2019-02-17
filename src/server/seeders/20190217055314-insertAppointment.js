"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Appointments",
      [
        {
          id: 1,
          startDateTime: new Date("2019-02-17T06:00:00"),
          endDateTime: new Date("2019-02-17T06:00:00"),
          staffId: 1,
          serviceId: 1,
          customerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Appointments", null, {});
  }
};
