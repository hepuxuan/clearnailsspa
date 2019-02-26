module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      name: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER
    },
    {}
  );
  Service.associate = function(models) {
    // associations can be defined here
    Service.hasMany(models.Appointment);
    Service.belongsTo(models.Category);
    Service.belongsToMany(models.Appointment, {
      through: "AppointmentServices",
      foreignKey: "ServiceId"
    });
  };
  return Service;
};
