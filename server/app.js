import 'babel-polyfill'
import express from 'express'
const app = express()

app.get('/', function (req, res) {
  res.send('Got a get request !')
})

app.put('/', function (req, res) {
  res.send('Got a put request !')
})

app.post('/', function (req, res) {
  res.send('Got a post request !')
})

app.delete('/', function (req, res) {
  res.send('Got a delete request !')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
