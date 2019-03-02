const { Staff } = require("../models");

async function getStaff(staffId) {
  const { id, photo, name } = await Staff.findOne({
    where: {
      id: staffId
    }
  });
  return { id, photo, name, title: "Technician" };
}

function convert(staff) {
  const { id, photo, name } = staff;
  return { id, photo, name, title: "Technician" };
}

module.exports = {
  getStaff,
  convert
};
