export default function(sequelize, DataTypes) {
  const BookState = sequelize.define('BookState', {}, {
    classMethods: {
      associate: function(models) {
        BookState.belongsTo(models.Book, {
          as: 'historyState',
          foreignKey: {
            name: 'bookId',
            allowNull: false
          },
          onDelete: 'CASCADE'
        })

        BookState.belongsTo(models.User, {
          as: 'receivingHistoryState',
          foreignKey: {
            name: 'receivingCustodyId',
            allowNull: false
          }
        })

        BookState.belongsTo(models.User, {
          as: 'givingHistoryState',
          foreignKey: {
            name: 'givingCustodyId',
            allowNull: false
          }
        })
      }
    }
  })
  return BookState
}
