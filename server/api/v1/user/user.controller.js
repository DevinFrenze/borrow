import { Book, User } from '../../../models'

// TODO throw actual errors when users don't exist or usernames are taken
exports.create = async function (req, res) {
  const { username, locationCoordinates } = req.body
  const location = { type: 'Point', coordinates: [37.9, -13.3] }
  const user = await User.create({ username, location }).catch((e) => console.log(e))
  res.status(201).send(user)
}

exports.readAll = async function (req, res) {
  const users = await User.findAll({
    include: [
      { model: Book, as: 'libraryBooks' },
      { model: Book, as: 'borrowingBooks' }
    ]
  })
  res.status(200).send(users)
}

exports.read = async function (req, res) {
  const userId = req.params.id
  const user = await User.findById(userId,
    {
      include: [
        { model: Book, as: 'libraryBooks' },
        { model: Book, as: 'borrowingBooks' }
      ]
    }
  )
  res.status(200).send(user)
}

exports.update = async function (req, res) {
  const userId = req.params.id;
  const username = req.body.username;
  const user = await User.findById(userId);
  await user.update({ username })
  res.status(200).send(user)
}

exports.delete = async function (req, res) {
  const userId = req.params.id
  const user = await User.findById(userId)
  user.destroy()
  res.status(200).send('user destroyed')
}
