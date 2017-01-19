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
    checkedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
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
      afterCreate: async function(book, options, cb) {
        await book.createHistoryState({
          receivingCustodyId: book.ownerId,
          givingCustodyId: book.ownerId
        })
        // TODO figure out if i am supposed to return anything
        return cb(null, options)
      }
    }
  });
  return Book;
};
