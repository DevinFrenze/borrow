import express from 'express';
const router = express.Router();

router.get('/', function (req, res) {
  res.send('Got a get request !')
})

router.put('/', function (req, res) {
  res.send('Got a put request !')
})

router.post('/', function (req, res) {
  res.send('Got a post request !')
})

router.delete('/', function (req, res) {
  res.send('Got a delete request !')
})

export default router;
