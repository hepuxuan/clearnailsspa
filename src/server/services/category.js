const { Service, Category } = require("../models");

async function getCategories() {
  const categories = await Category.findAll({
    include: [{ model: Service }]
  });

  return categories.map(({ id, name, Services }) => ({
    id,
    name,
    services: Services.map(({ id, name, duration, price }) => ({
      id,
      name,
      duration,
      price
    }))
  }));
}

module.exports = {
  getCategories
};
