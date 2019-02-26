const { Service } = require("../models");

async function getServices(categoryId) {
  const service = await Service.findAll({
    where: {
      CategoryId: categoryId
    }
  });

  return service.map(convert);
}

async function getService(id) {
  return convert(
    await Service.findOne({
      where: {
        id
      }
    })
  );
}

function convert(dto) {
  const { id, name, description, duration, price, CategoryId } = dto;
  return { id, description, name, duration, price, categoryId: CategoryId };
}

module.exports = {
  getService,
  getServices
};
