module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Staffs",
      [
        {
          id: 1,
          name: "Wenyu Duan",
          photo: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Haopeng Wang",
          photo: "",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Staffs", null, {});
  }
};
