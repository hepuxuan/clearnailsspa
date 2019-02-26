module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Appointments", "TimeSlotId", {
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
    return queryInterface.removeColumn("Appointments", "ScheduleId");
  }
};
