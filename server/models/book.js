export default function(sequelize, DataTypes) {
  const Book = sequelize.define('Book', {
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isTenOrThirteenLong: function(isbn) {
          return isbn.length === 10 || isbn.length === 13
        }
      }
    },
    searchable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Book.belongsTo(models.User, {
          as: 'libraryBook',
          foreignKey: {
            name: 'ownerId',
            allowNull: false
          },
          onDelete: 'CASCADE'
        })

        Book.belongsTo(models.User, {
          as: 'borrowingBook',
          foreignKey: {
            name: 'borrowerId',
            allowNull: true
          }
        })

        Book.hasMany(models.BookState, { as: 'historyStates', foreignKey: 'bookId' })
      }
    },
    hooks: {
      afterCreate: async function(book, options) {
        await book.createHistoryState({
          receivingCustodyId: book.ownerId,
          givingCustodyId: book.ownerId
        })
      },
      beforeUpdate: async function(book, options) {
        if (options.fields.includes('borrowerId')) {
          await book.createHistoryState({
            receivingCustodyId: book.borrowerId || book.ownerId,
            givingCustodyId: book.previous('borrowerId') || book.ownerId
          })
        }
      }
    }
  })
  return Book
}
