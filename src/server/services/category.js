const { Category } = require("../models");

async function getCategories() {
  const categories = await Category.findAll();

  console.log(JSON.stringify(categories, null, 2));
  return categories.map(({ id, name, image }) => ({
    id,
    name,
    image
  }));
}

async function getCategory(categoryId) {
  const category = await Category.findOne({
    where: {
      id: categoryId
    }
  });

  const { id, name, image } = category;

  return {
    id,
    name,
    image
  };
}

module.exports = {
  getCategories,
  getCategory
};
