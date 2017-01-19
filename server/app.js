import 'babel-polyfill'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import express from 'express'
import passport from 'passport'
import helmet from 'helmet'
import models from './models'
import routes from './routes'

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(helmet())

routes(app)

models.sequelize.sync().then(
  app.listen(3000, 'localhost', function () {
    console.log('Example app listening on port 3000!')
  })
)

exports = module.exports = app
