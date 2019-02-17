module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDateTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDateTime: {
        allowNull: false,
        type: Sequelize.DATE
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
      serviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: "services",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "customers",
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
    return queryInterface.dropTable("Appointments");
  }
};