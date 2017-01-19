import book from './book/book.controller'
import user from './user/user.controller'
import { passwordAuthenticate, tokenAuthenticate } from './auth'
import oauth from './oauth'
import express from 'express'
const router = express.Router()

router.get('/users', user.readAll)

// auth endpoints
router.post('/token', passwordAuthenticate, oauth.grantToken, oauth.errorHandler)

// unprotected routes
router.get('/books/search', book.search)
router.get('/books/:id', book.read)
router.get('/books', book.readAll)

router.post('/users', user.create)

// protected routes
router.post('/books', tokenAuthenticate, book.create)
router.patch('/books/:id/checkout', tokenAuthenticate, book.checkout)
router.patch('/books/:id/return', tokenAuthenticate, book.return)
// only can update 'searchable' and only owner can update
router.patch('/books/:id', tokenAuthenticate, book.update)
router.delete('/books/:id', tokenAuthenticate, book.delete)

router.get('/users/:id', tokenAuthenticate, user.read)
router.patch('/users/me', tokenAuthenticate, user.update)
router.delete('/users/me', tokenAuthenticate, user.delete)

export default router
