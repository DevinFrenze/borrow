import * as book from './book/book.controller'
import * as user from './user/user.controller'
import { passwordAuthenticate, tokenAuthenticate } from './auth'
import { grantToken, authErrorHandler } from './oauth'
import express from 'express'
import { errorWrapper, errorHandler } from './error'
import rateLimiter from './rateLimiter'
const router = express.Router()

// wrap every method form each controller in error handler
Object.keys(book).map(function (key) { book[key] = errorWrapper(book[key]) })
Object.keys(user).map(function (key) { user[key] = errorWrapper(user[key]) })

router.get('/users', user.readAll)

// auth endpoints
router.post('/token', passwordAuthenticate, grantToken, authErrorHandler)

// unprotected routes
router.get('/books/search', book.search)
router.get('/books/:id', book.read)
router.get('/books', book.readAll)

router.post('/users', rateLimiter, user.create)

// protected routes
router.post('/books', tokenAuthenticate, book.create)
router.patch('/books/:id/checkout', tokenAuthenticate, book.checkout)
router.patch('/books/:id/checkin', tokenAuthenticate, book.checkin)
// only can update 'searchable' and only owner can update
router.patch('/books/:id', tokenAuthenticate, book.update)
router.delete('/books/:id', tokenAuthenticate, book.destroy)

router.get('/users/:id', tokenAuthenticate, user.read)
router.patch('/users/me', tokenAuthenticate, user.update)
router.delete('/users/me', tokenAuthenticate, user.destroy)

// default error handler
router.use(errorHandler)

export default router
