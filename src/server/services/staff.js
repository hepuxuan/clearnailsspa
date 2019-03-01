const { Staff } = require("../models");

async function getStaff(staffId) {
  const { id, photo, name } = await Staff.findOne({
    where: {
      id: staffId
    }
  });
  return { id, photo, name, title: "Technician" };
}

module.exports = {
  getStaff
};
