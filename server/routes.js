import apiRouter from './api/v1'
import express from 'express'
const router = express.Router()
router.use('/api/v1', apiRouter)
export default router
