module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      day: DataTypes.STRING
    },
    {}
  );
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belongsTo(models.Staff);
    Schedule.belongsTo(models.TimeSlot);
    Schedule.hasOne(models.Appointment);
  };
  return Schedule;
};
