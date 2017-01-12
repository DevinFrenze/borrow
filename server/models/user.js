'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // TODO figure out why this is not forcing uniqueness
      validate: { notEmpty: true }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Book);
      }
    }
  });
  return User;
};
