module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: 1,
          name: "Manicure",
          image: "/public/hand.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "PEDICURE",
          image: "/public/foot.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
