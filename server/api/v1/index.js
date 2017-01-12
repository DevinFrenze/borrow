import users from './users/user.controller'
import express from 'express'
const router = express.Router()

router.post('/users', users.create)
router.get('/users', users.readAll)
router.get('/users/:id', users.read)
router.patch('/users/:id', users.update)
router.delete('/users/:id', users.delete)

export default router
