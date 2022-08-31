import express from 'express'
import RatingController from '../controllers/Rating.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new express.Router()

router.get('/product/:productId([0-9]+)', RatingController.getOne)
router.post('/product/:productId([0-9]+)/rate/:rate',authMiddleware, RatingController.update)


export default router