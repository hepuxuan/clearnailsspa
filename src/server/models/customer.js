module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.hasMany(models.Appointment);
  };
  return Customer;
};
