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
    }
  });
  return BookState;
};