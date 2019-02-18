module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Schedules", "TimeSlotId", {
      type: Sequelize.INTEGER,
      references: {
        model: "TimeSlots",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Schedules", "TimeSlotId");
  }
};
