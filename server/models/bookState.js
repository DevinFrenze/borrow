'use strict';
module.exports = function(sequelize, DataTypes) {
  var BookState = sequelize.define('BookState', {}, {
    classMethods: {
      associate: function(models) {
        BookState.belongsTo(models.Book, {
          as: 'historyState',
          foreignKey: {
            name: 'bookId',
            allowNull: false
          }
        });

        BookState.belongsTo(models.User, {
          as: 'receivingHistoryState',
          foreignKey: {
            name: 'receivingCustodyId',
            allowNull: false
          }
        });

        BookState.belongsTo(models.User, {
          as: 'givingHistoryState',
          foreignKey: {
            name: 'givingCustodyId',
            allowNull: false
          }
        });
      }
    },

    hooks: {
      afterCreate: async function(bookState) {
        const book = await sequelize.models.Book.findById(bookState.bookId)
        await book.update({ checkedOut: bookState.receivingCustodyId !== book.ownerId })
      }
    }
  });
  return BookState;
};
