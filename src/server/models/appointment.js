module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    { date: DataTypes.DATEONLY },
    {}
  );
  Appointment.associate = function(models) {
    // associations can be defined here
    // Appointment.belongsTo(models.Service);
    Appointment.belongsTo(models.Customer);
    Appointment.belongsTo(models.TimeSlot);
    Appointment.belongsTo(models.Staff);
    Appointment.belongsToMany(models.Service, {
      through: "AppointmentServices",
      foreignKey: "AppointmentId"
    });
  };

  return Appointment;
};
