import { Book, BookState, User } from '../../../models'

exports.create = async function (req, res) {
  const isbn = req.body.isbn
  const ownerId = req.user.id
  const book = await Book.create({ isbn, ownerId })
  res.status(201).send(book)
}

exports.readAll = async function (req, res) {
  const books = await Book.findAll({
    include: [ { model: BookState, as: 'historyStates' } ]
  })
  res.status(200).send(books)
}

exports.read = async function (req, res) {
  const bookId = req.params.id
  const book = await Book.findById(bookId)
  res.status(200).send(book)
}

exports.checkout = async function (req, res) {
  const bookId = req.params.id
  const borrowerId = req.user.id
  let book = await Book.findById(bookId)
  if (book.borrowerId) {
    res.status(400).send('can not check out a book that is already checked out')
  }
  await book.update({ borrowerId })
  res.status(200).send(book)
}

exports.return = async function (req, res) {
  const bookId = req.params.id
  const borrowerId = req.user.id
  let book = await Book.findById(bookId)
  if (book.borrowerId !== borrowerId) {
    res.status(400).send('can not return a book that you do not have checked out')
  }
  await book.update({ borrowerId: null })
  res.status(200).send(book)
}

// can only update 'searchable'
exports.update = async function (req, res) {
  const bookId = req.params.id
  const { searchable }  = req.body
  let book = await Book.findById(bookId)
  if (book.ownerId !== req.user.id) res.status(401).send()
  await book.update({ searchable })
  res.status(200).send(book)
}

exports.delete = async function (req, res) {
  const bookId = req.params.id
  const book = await Book.findById(bookId)
  if (book.userId !== req.user.id) res.status(401).send()
  await book.destroy()
  res.status(200).send('book destroyed')
}

exports.search = async function(req, res) {
  const isbn = req.query.isbn
  const books = await Book.findAll({ where: { isbn } })
  return res.status(200).send(books)
}
