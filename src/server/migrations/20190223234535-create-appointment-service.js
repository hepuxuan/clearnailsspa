module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("AppointmentServices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AppointmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "appointments",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      ServiceId: {
        type: Sequelize.INTEGER,
        references: {
          model: "services",
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
    return queryInterface.dropTable("AppointmentServices");
  }
};
