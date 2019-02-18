module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Appointments", "ScheduleId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Schedules",
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
