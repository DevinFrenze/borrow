'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
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
      /*
    available: {
      type: DataTypes.VIRTUAL,
      get: function () {
        const ownerId = this.getDataValue('ownerId');
        const custodyId = this.getDataValue('custodyId');
        const searchable = this.getDataValue('searchable');
        return searchable && ownerId === custodyId;
      }
    }
    */
  }, {
    classMethods: {
      associate: function(models) {
        Book.belongsTo(models.User, {
          as: 'libraryBook',
          foreignKey: {
            name: 'ownerId',
            allowNull: false
          }
        });

        Book.hasMany(models.BookState, { as: 'historyStates', foreignKey: 'bookId' })
      }
    },

    hooks: {
      beforeCreate: function() { console.log('BEFORE CREATE !!!') },
      afterCreate: function() { console.log('AFTER CREATE !!!') },
      beforeUpdate: function() { console.log('BEFORE UPDATE !!!') },
      afterUpdate: function() { console.log('AFTER UPDATE !!!') },
    }
  });
  return Book;
};
