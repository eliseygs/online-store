import express from 'express'
import RatingController from '../controllers/Rating.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new express.Router()

router.get('/product/:productId([0-9]+)', RatingController.getRating)


export default router