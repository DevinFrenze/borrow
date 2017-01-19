import bcrypt from 'bcrypt'

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
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      defaultValue: 'password', // TODO remove this line after testing
      validate: { notEmpty: true }
    },
    passwordHash: {
      type: DataTypes.STRING,
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
        User.hasMany(models.BookState, { as: 'receivingHistoryStates', foreignKey: 'receivingCustodyId' })
        User.hasMany(models.BookState, { as: 'givingHistoryStates', foreignKey: 'givingCustodyId' })
      }
    },
    instanceMethods: {
      authenticate: function(password) {
        return bcrypt.compareSync(password, this.passwordHash)
      }
    },
    hooks: {
      beforeCreate: function(user, options, cb) {
        const password = user.get('password')
        const hash = bcrypt.hashSync(password, 10)
        user.set('passwordHash', hash)
        return cb(null, options)
      }
    }
  });
  return User;
};
