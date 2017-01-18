import 'babel-polyfill'
import config from '../config/environment'
import path from 'path';

export const up = async function (queryInterface, Sequelize) {
  const now = new Date()
  const fname = path.basename(__filename)

  /*
  const alreadyRunResults = await queryInterface.sequelize.query(`
    SELECT id
    FROM SequelizeSeedMeta
    WHERE name='${fname}'
  `, {raw: true})

  if (Array.isArray(alreadyRunResults[0]) && alreadyRunResults[0].length > 0) {
    console.log('Nothing to do; operation already completed.');
    return null;
  }
  */

  await queryInterface.bulkInsert('users', [{
    username: 'devin',
    password: 'password',
    createdAt: now,
    updatedAt: now,
  }], {})

  await queryInterface.bulkInsert('clients', [{
    clientId: config.auth.clientId,
    clientSecret: config.auth.clientSecret,
    trustedClient: true,
    createdAt: now,
    updatedAt: now,
  }], {})
}

export const down = async function (queryInterface, Sequelize) {
  const fname = path.basename(__filename);

  /*
  const removeEntry = queryInterface.sequelize.query(`
    DELETE FROM SequelizeSeedMeta
    WHERE name='${fname}'
  `, {raw: true});
  */

  return Promise.all([
    queryInterface.bulkDelete('users'),
    queryInterface.bulkDelete('clients'),
    // removeEntry,
  ]);
}

export default { up, down }
