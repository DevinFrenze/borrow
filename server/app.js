import 'babel-polyfill'

import express from 'express'
const app = express()

import routes from './routes'
routes(app)

app.listen(3000, 'localhost', function () {
  console.log('Example app listening on port 3000!')
})

exports = module.exports = app;
