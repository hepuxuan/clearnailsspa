module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Schedules",
      [
        {
          id: 1,
          staffId: 1,
          timeSlotId: 1,
          day: "Mon",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          staffId: 1,
          timeSlotId: 2,
          day: "Mon",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          staffId: 2,
          timeSlotId: 1,
          day: "Mon",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          staffId: 1,
          timeSlotId: 1,
          day: "Fri",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          staffId: 1,
          timeSlotId: 2,
          day: "Fri",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          staffId: 1,
          timeSlotId: 2,
          day: "Tue",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          staffId: 1,
          timeSlotId: 2,
          day: "Thu",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          staffId: 1,
          timeSlotId: 2,
          day: "Wed",
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
