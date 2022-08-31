import RatingModel from '../models/Rating.js'
import AppError from '../errors/AppError.js'
///
const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true
class Rating {
    async getOne(req, res, next) {
        try {
            let rating
            // const user= await RatingModel.getOne(parseInt(req.auth.userId))
            // req.auth.userId= user.id
            // res.json(user)
            if(req.signedCookies.ratingId){
                rating= await RatingModel.getOne(parseInt(req.signedCookies.ratingId, req.params.productId))
            }else{
                const created= RatingModel.create()
                res.cookie('ratingId',created.id, {maxAge, signed})
                rating= await RatingModel.getOne(created.id, req.params.productId )
            }
            res.json(rating)
            //const rating = await RatingModel.getOne(req.params.productId)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
             //let userId= parseInt(req.user.id);
             let ratingId
             if(!req.signedCookies.ratingId){
                let created= await Rating.create()
                ratingId= created.id
             }else{
                ratingId= parseInt(req.signedCookies.ratingId)
             }
             const {productId, rate} = req.params
             const rating = await RatingModel.update(productId, rate,ratingId)
             res.cookie('ratingId', rating.id, {maxAge, signed})
             res.json(rating)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Rating()