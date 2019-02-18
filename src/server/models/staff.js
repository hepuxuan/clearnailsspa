module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "Staff",
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING
    },
    {}
  );
  Staff.associate = function(models) {
    // associations can be defined here、
    Staff.hasMany(models.Schedule);
  };
  return Staff;
};
