import book from './book/book.controller'
import user from './user/user.controller'
import express from 'express'
const router = express.Router()

// TODO cascade ???

// unprotected routes
router.post('/users', user.create)
router.get('/books/search', book.search)
router.get('/books/:id', book.read)

// protected routes
router.post('/books', book.create)
router.patch('/books/:id', book.update)   // check out a book by update 'custodyId'
router.delete('/books/:id', book.delete)

router.get('/users/:id', user.read)
router.patch('/users/:id', user.update)
router.delete('/users/:id', user.delete)

// soon to be deleted routes
router.get('/users', user.readAll)
router.get('/books', book.readAll)

export default router
