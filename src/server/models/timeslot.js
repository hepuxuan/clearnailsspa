module.exports = (sequelize, DataTypes) => {
  const TimeSlot = sequelize.define(
    "TimeSlot",
    {
      name: DataTypes.STRING,
      start: DataTypes.TIME,
      end: DataTypes.TIME
    },
    {}
  );
  TimeSlot.associate = function(models) {
    // associations can be defined here
    TimeSlot.hasMany(models.Schedule);
  };
  return TimeSlot;
};
