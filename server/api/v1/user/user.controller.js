import { Book, BookState, User } from '../../../models'

export async function create(req, res) {
  const { username, latitude, longitude, password } = req.body
  const location = latitude && longitude && { type: 'Point', coordinates: [latitude, longitude] }
  let user = await User.create({ username, location, password })
  // using "find" applies the default scope
  user = await User.findById(user.id)
  res.status(201).send(user)
}

export async function readAll(req, res) {
  const users = await User.findAll()
  res.status(200).send(users)
}

export async function read(req, res) {
  const userId = req.params.id
  const user = await User.findById(userId)
  res.status(200).send(user)
}

export async function update(req, res) {
  const userId = req.user.id
  const { username, latitude, longitude } = req.body
  const location = latitude && longitude && { type: 'Point', coordinates: [latitude, longitude] }
  const user = await User.findById(userId)
  await user.update({ username, location })
  res.status(200).send(user)
}

export async function destroy(req, res) {
  const userId = req.user.id
  const user = await User.findById(userId, {
    include: [ { model: Book, as: 'borrowingBooks' } ]
  })
  if(user.borrowingBooks.length) {
    res.status(403).send('can not delete user with books currently checked out')
  }
  user.destroy()
  res.status(200).send('user destroyed')
}
