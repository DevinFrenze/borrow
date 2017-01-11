'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    isbn: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Book.belongsTo(models.User);
      }
    }
  });
  return Book;
};
