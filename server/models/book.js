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
        const ownerId = this.getDataValue('ownerId');
        const inCustodyOfId = this.getDataValue('inCustodyOfId');
        const searchable = this.getDataValue('searchable');
        return searchable && ownerId === inCustodyOfId;
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Book.belongsTo(models.User, { as: 'libraryBook', foreignKey: 'ownerId' });
        Book.belongsTo(models.User, { as: 'borrowingBook', foreignKey: 'inCustodyOfId' });
      }
    }
  });
  return Book;
};
