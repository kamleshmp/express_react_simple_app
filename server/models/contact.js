'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Contact.hasMany(models.Message);
      }
    }
  });
  return Contact;
};
