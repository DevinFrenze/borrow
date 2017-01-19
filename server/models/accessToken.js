'use strict';
module.exports = function(sequelize, DataTypes) {
  var AccessToken = sequelize.define('AccessToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        AccessToken.belongsTo(models.User, {
          foreignKey: { name: 'userId', allowNull: false }
        })
      }
    }
  });
  return AccessToken;
};
