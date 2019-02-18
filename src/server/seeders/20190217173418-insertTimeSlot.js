module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "TimeSlots",
      [
        {
          id: 1,
          name: "9:00 - 10:00",
          start: "9:00",
          end: "10:00",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "10:00 - 11:00",
          start: "10:00",
          end: "11:00",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TimeSlot", null, {});
  }
};
