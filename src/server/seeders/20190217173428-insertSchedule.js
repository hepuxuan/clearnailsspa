module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Schedules",
      [
        {
          id: 1,
          staffId: 1,
          startTime: "9:00",
          endTime: "18:00",
          day: "Mon",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Schedules", null, {});
  }
};
