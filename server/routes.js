module.exports = function(app) {
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
};
