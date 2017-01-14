import { Book, BookState, User } from '../../../models'

// TODO throw actual errors when users don't exist or usernames are taken
exports.create = async function (req, res) {
  const { username, latitude, longitude } = req.body
  const location = latitude && longitude && { type: 'Point', coordinates: [latitude, longitude] }
  const user = await User.create({ username, location })
  res.status(201).send(user)
}

exports.readAll = async function (req, res) {
  const users = await User.findAll({
    include: [
      { model: Book, as: 'libraryBooks' },
      { model: BookState, as: 'givingHistoryStates' },
      { model: BookState, as: 'receivingHistoryStates' }
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
        { model: BookState, as: 'givingHistoryStates' },
        { model: BookState, as: 'receivingHistoryStates' }
      ]
    }
  )
  res.status(200).send(user)
}

exports.update = async function (req, res) {
  const userId = req.params.id
  const { username, latitude, longitude } = req.body
  const location = latitude && longitude && { type: 'Point', coordinates: [latitude, longitude] }
  const user = await User.findById(userId)
  // note: if location is undefined, it won't replace the current location
  await user.update({ username, location })
  res.status(200).send(user)
}

exports.delete = async function (req, res) {
  const userId = req.params.id
  const user = await User.findById(userId)
  user.destroy()
  res.status(200).send('user destroyed')
}
