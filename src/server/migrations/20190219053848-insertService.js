module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Services",
      [
        {
          id: 1,
          name: "Signature Manicure",
          categoryId: 1,
          duration: 30,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Spa Manicure",
          categoryId: 1,
          duration: 30,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 25,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "No-Chip Manicure",
          categoryId: 1,
          duration: 30,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: "Signature Pedicure",
          categoryId: 2,
          duration: 30,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 28,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: "Spa Pedicure",
          categoryId: 2,
          duration: 30,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: "Milk & Honey Pedicure",
          categoryId: 2,
          duration: 30,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 40,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: "Clear Delux Pedicure",
          categoryId: 2,
          duration: 30,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: "Nails Design",
          categoryId: 3,
          duration: 5,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: "Waxi",
          categoryId: 3,
          duration: 5,
          description:
            "Cras eget commodo mauris. Etiam non ligula nec urna tempor rhoncus ac sit amet nibh. Urna tempor rhoncus ac sit amet nibh.",
          price: 50,
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
