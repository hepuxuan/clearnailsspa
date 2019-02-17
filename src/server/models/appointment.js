module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      startDateTime: DataTypes.DATE,
      endDateTime: DataTypes.DATE
    },
    {}
  );
  Appointment.associate = function(models) {
    // associations can be defined here
    Appointment.belongsTo(models.Service);
    Appointment.belongsTo(models.Staff);
    Appointment.belongsTo(models.Customer);
  };

  return Appointment;
};
