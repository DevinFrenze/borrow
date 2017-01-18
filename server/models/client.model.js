'use strict';
module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    clientId: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
    trustedClient: DataTypes.BOOLEAN
  });
  return Client;
};
