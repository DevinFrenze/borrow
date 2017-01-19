import 'babel-polyfill'
import config from '../config/environment'
import User from '../models/user'

export const up = async function (queryInterface, Sequelize) {
  const now = new Date()

  await User(queryInterface.sequelize, Sequelize.DataTypes).create({
    username: 'devin',
    password: 'password',
  });

  await queryInterface.bulkInsert('clients', [{
    clientId: config.auth.clientId,
    clientSecret: config.auth.clientSecret,
    trustedClient: true,
    createdAt: now,
    updatedAt: now,
  }], {})
}

export const down = async function (queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.bulkDelete('users'),
    queryInterface.bulkDelete('clients'),
  ]);
}

export default { up, down }
