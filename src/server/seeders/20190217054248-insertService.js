"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Services",
      [
        {
          id: 1,
          name: "Spa Manicure",
          duration: 30,
          description: "",
          price: 26,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Services", null, {});
  }
};
