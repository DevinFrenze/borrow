import book from './book/book.controller'
import user from './user/user.controller'
import { authenticate, bearerAuthenticate } from './auth'
import oauth from './oauth'
import express from 'express'
const router = express.Router()

// TODO cascade ???

// auth endpoints
router.post('/token', authenticate, oauth.grantToken, oauth.errorHandler)

// unprotected routes
router.get('/books/search', book.search)
router.get('/books/:id', book.read)
router.get('/books', book.readAll)

router.post('/users', user.create)

// protected routes
router.post('/books', bearerAuthenticate, book.create)
router.patch('/books/:id/checkout', bearerAuthenticate, book.checkout)
router.patch('/books/:id/return', bearerAuthenticate, book.return)
// only can update 'searchable' and only owner can update
router.patch('/books/:id', bearerAuthenticate, book.update)
router.delete('/books/:id', bearerAuthenticate, book.delete)

router.get('/users/:id', bearerAuthenticate, user.read)
router.patch('/users/me', bearerAuthenticate, user.update)
router.delete('/users/me', bearerAuthenticate, user.delete)

export default router
