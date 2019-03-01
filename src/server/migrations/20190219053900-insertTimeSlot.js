module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "TimeSlots",
      [
        {
          id: 1,
          name: "9:00 am",
          start: "9:00",
          end: "10:00",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "10:00 am",
          start: "10:00",
          end: "11:00",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "12:00 pm",
          start: "12:00",
          end: "13:00",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: "13:00 pm",
          start: "13:00",
          end: "14:00",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: "14:00 pm",
          start: "14:00",
          end: "15:00",
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
