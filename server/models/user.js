'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "a user with this username already exists",
      },
      validate: { notEmpty: true }
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Book, { as: 'libraryBooks', foreignKey: 'ownerId' })
        User.hasMany(models.Book, { as: 'borrowingBooks', foreignKey: 'custodyId' })
      }
    },
  });
  return User;
};
