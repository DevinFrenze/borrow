export default function(sequelize, DataTypes) {
  const Client = sequelize.define('Client', {
    clientId: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
    trustedClient: DataTypes.BOOLEAN
  })
  return Client
}
