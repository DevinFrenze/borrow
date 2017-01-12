'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isTenOrThirteenLong: function(isbn) {
          return isbn.length === 10 || isbn.length === 13;
        }
      }
    },
    searchable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    available: {
      type: DataTypes.VIRTUAL,
      get: function () {
        const owner = this.getDataValue('owner');
        const inCustodyOf = this.getDataValue('inCustodyOf');
        const searchable = this.getDataValue('searchable');
        return searchable && owner === inCustodyOf;
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Book.belongsTo(models.User, { foreignKey: { name: 'owner', allowNull: false } });
        Book.belongsTo(models.User, { foreignKey: { name: 'inCustodyOf', allowNull: false } });
      }
    }
  });
  return Book;
};
