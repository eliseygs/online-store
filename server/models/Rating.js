import {Rating as RatingMapping} from './mapping.js'
import {Product as ProductMapping} from './mapping.js'
import {RatingProduct as RatingProductMapping} from './mapping.js'
import pkg from 'sequelize'
const { Op } = pkg;
///
// const pretty = (rating) => {
//     const data = {}
//     data.id = rating.id
//     data.grades = []
//     if (rating.products) {
//         data.grades = rating.products.map(item => {
//             return {
//                 id: item.id,
//                 productId: item.rating_product.productId,
//                 //name: item.name, //не понадобиться
//                 //price: item.price,
//                 rate: item.rating_product.rate
//                 //quantity: item.basket_product.quantity
//             }
//         })
//     }
//     return data
// }


// const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
// const signed = true
/// //   ЭТО ПРОМУЖУТОЧНАЯ ТАБЛИЗА RATING ТАК кАК связана С useriD PRODUCTiD КАК И У BASKETdevice BASKETiD PRODUCTiD
class Rating {
    async getRating(productId) {
        //  let ratings= await RatingMapping.findByPk(ratingId, {
        //      attributes:['id']
        //  })
        //  if(!ratings){
        //      ratings= await RatingMapping.create()
        //  }

        // let rating = await RatingMapping.findByPk(ratingId,{
        //     attributes:['id']
        // })
         const votes = await RatingProductMapping.count({where:{productId, rate:{[Op.gt]: 0}}})
         //find on ratingMapping because in productMaping doesnot true count with rating get
         //rating need to save in coockie
         if (votes) {
             const rates = await RatingProductMapping.sum('rate', {where:{productId}})
             const product= await ProductMapping.findByPk(productId)
             product.rating= rates/votes
             product.save()
             return {votes, rating: product.rating}
         }
         return {votes:0, rating:0}
        // let user = await UserMapping.findByPk(userId, {
        //     attributes: ['id'],
        //     include: [
        //         {model: ProductMapping, attributes: ['id', 'name', 'price']},
        //     ],
        // })
        
        //return pretty(user)

     }

    // async getGrade(ratingId, productId) {
    //          const rating_product= await RatingProductMapping.findOne({where:{ratingId, productId}})
    //          if(rating_product){
    //             return rating_product.rate
    //          }else{
    //              return 0
    //          }
    //  }
     

    // async create(productId) {
    //     const created = await RatingMapping.create()
    //     await RatingProductMapping.create({ratingId: created.id, productId})
    //     let rating = await RatingMapping.findByPk(created.id,{
    //         attributes:['id'],
    //         include: [
    //             {model: ProductMapping, as:'products'}
    //         ]
    //     })
    //     return pretty(rating)
    // }

    // async update(productId,rate,ratingId){
    //     console.log('-------------------------update ')
    //     console.log(ratingId)
    //     let rating = await RatingMapping.findByPk(ratingId,{
    //         attributes:['id'],
    //         include: [
    //             {model: ProductMapping, as:'products'}
    //         ]
    //     })
    //     console.log('-------------------------rating ')
    //     console.log(rating)
        
    //     if(!rating){
    //         console.log('calllllllllllll----------------------------')
    //         rating = await RatingMapping.create()
    //     }
    //     let rating_product= await RatingProductMapping.findOne({where:{ratingId, productId}})

    //     console.log('------------------------- ')
    //     console.log(rating_product)
    //     if(rating_product){
    //          rating_product.rate= rate
    //          await rating_product.save()
    //     }else{
    //         await RatingProductMapping.create({ratingId, productId, rate})
    //     }

    //     await rating.reload()
    //     return pretty(rating)
        // let user = await UserMapping.findByPk(userId, {
        //     attributes: ['id'],
        //     include: [
        //         // this Product reloyd too 
        //         {model: ProductMapping,  attributes:['id'], as:'products'}//attributs also have function get for show need col
        //     ]
        // })

        //  if (!user) {
        //      throw new Error('Пользователь не найден в БД')
        //  }

        //     rating= await RatingMapping.findOne({where:{userId, productId}})    
        // const {
        //     newRate = rating.rate
        // }= rate
        // await rating.update({newRate})
        // await rating.reload()
    
        //  const product = await RatingMapping.findOne({
        //      where: {productId}
        //  })
        //  if (!product) {
        //      throw new Error('Товар не найден в БД')
        //  }
        //  let rating = await RatingMapping.findOne({where: {productId}})
        //  if(!rating){
        //      rating = await RatingMapping.create({rate, userId, productId}) 
        //  }

    //     console.log('-----------------------------------------------------------------------------------------------')
    //     console.log('##############################################################################################################')
    //     // if (!basket) {
    //     //     basket = await Mapping.create()
    //     // }
    //     // проверяем, есть ли уже этот товар в корзине
    //     const user_product = await RatingMapping.findOne({
    //         where: {userId, productId}
    //     })
    //     console.log('*************************************************************************************')
    //          const parseRate= parseFloat(rate)
    //     if (user_product) { // есть в корзине
    //         user_product.rate= parseRate
    //         await user_product.save()
    //         //await ProductMapping.update({rate})
    //     } else { // нет в корзине
    //          await RatingMapping.create({productId, userId, rate})//save in user
    //     }
    //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    //     return parseRate;
    //     // обновим объект корзины, чтобы вернуть свежие данные
    //     //await user.reload()

    //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

    // }
}

export default new Rating()