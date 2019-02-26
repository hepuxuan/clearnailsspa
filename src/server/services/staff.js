const { Staff } = require("../models");

async function getStaff(staffId) {
  const { id, photo, name } = await Staff.findOne({
    where: {
      id: staffId
    }
  });
  return { id, photo, name };
}

module.exports = {
  getStaff
};
