import RatingModel from '../models/User.js'
import AppError from '../errors/AppError.js'
///
const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true
class Rating {
    async getRating(req, res, next) {
        try {
            let rating;
            // const user= await RatingModel.getOne(parseInt(req.auth.userId))
            // req.auth.userId= user.id
            // res.json(user)
                rating= await RatingModel.getRating(parseInt(req.params.productId))
            // }else{
                // const created= RatingModel.create()
                // res.cookie('ratingId',created.id, {maxAge, signed})
                // rating= await RatingModel.getRating(created.id, req.params.productId )
            // }
            res.json(rating)
            //const rating = await RatingModel.getOne(req.params.productId)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    
    async getGrade(req, res, next) {
        try {
            console.log('1')
            if(req.signedCookies.ratingId){
            console.log('2')
                console.log(req.signedCookies.ratingId)
                const rate= await RatingModel.getGrade(parseInt(req.signedCookies.ratingId), parseInt(req.params.productId))
                res.json(rate)
            console.log('3')
            }else{
            console.log('4')
            const rating= await RatingModel.create(req.params.productId)
            console.log('5')
            console.log('6')
                // rating= await RatingModel.getGrade(parseInt(created.id), parseInt(req.params.productId))
            console.log('7')
            res.cookie('ratingId',rating.id, {maxAge, signed})
            res.json(rating.rate)
            }
            console.log('8')
            console.log('9')
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

//     async update(req, res, next) {
//         try {
//              //let userId= parseInt(req.user.id);
//              let ratingId
//              }else{
//                 ratingId= parseInt(req.signedCookies.ratingId)
//                 console.log(ratingId)
//              }
//              const {productId, rate} = req.params
//              const rating = await RatingModel.update(productId, rate, ratingId)
//              res.cookie('ratingId', rating.id, {maxAge, signed})
//              res.json(rating)
//         } catch(e) {
//             next(AppError.badRequest(e.message))
//         }
//     }
}

export default new Rating()