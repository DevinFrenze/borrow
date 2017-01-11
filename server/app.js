import 'babel-polyfill'
import models from './models'

import express from 'express'
const app = express()

import routes from './routes'
routes(app)

models.sequelize.sync().then(
  app.listen(3000, 'localhost', function () {
    console.log('Example app listening on port 3000!')
  })
)

exports = module.exports = app
