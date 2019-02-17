module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Schedules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      endTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      day: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staffId: {
        type: Sequelize.INTEGER,
        references: {
          model: "staffs",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Schedules");
  }
};
