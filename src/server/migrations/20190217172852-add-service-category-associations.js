"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Services", "CategoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Services", "SubCategoryId");
  }
};
