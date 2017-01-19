import { Book, BookState, User } from '../../../models'

exports.create = async function (req, res) {
  const { username, latitude, longitude } = req.body
  const location = latitude && longitude && { type: 'Point', coordinates: [latitude, longitude] }
  let user = await User.create({ username, location })
  // using "find" applies the default scope
  user = await User.findById(user.id)
  res.status(201).send(user)
}

exports.readAll = async function (req, res) {
  const users = await User.findAll()
  res.status(200).send(users)
}

exports.read = async function (req, res) {
  const userId = req.params.id
  const user = await User.findById(userId)
  res.status(200).send(user)
}

exports.update = async function (req, res) {
  const userId = req.user.id
  const { username, latitude, longitude } = req.body
  const location = latitude && longitude && { type: 'Point', coordinates: [latitude, longitude] }
  const user = await User.findById(userId)
  // note: if location is undefined, it won't replace the current location
  await user.update({ username, location })
  res.status(200).send(user)
}

exports.delete = async function (req, res) {
  const userId = req.user.id
  const user = await User.findById(userId, {
    include: [ { model: Book, as: 'borrowingBooks' } ]
  })
  // TODO don't allow deletion of a user if they have books checked out
  if(user.borrowingBooks.length) res.status(403).send('can not delete user with books currently checked out')
  user.destroy()
  res.status(200).send('user destroyed')
}
