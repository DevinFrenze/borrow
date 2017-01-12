'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { // TODO figure out why this is not forcing uniqueness
        msg: "a user with this username already exists",
      },
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
