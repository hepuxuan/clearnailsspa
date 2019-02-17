module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      day: DataTypes.STRING
    },
    {}
  );
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belongsTo(models.Staff);
  };
  return Schedule;
};
