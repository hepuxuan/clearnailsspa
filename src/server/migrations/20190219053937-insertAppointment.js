module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Appointments",
      [
        {
          id: 1,
          scheduleId: 1,
          customerId: 1,
          date: "2019-03-01",
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
