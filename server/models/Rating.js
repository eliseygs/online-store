import { Rating as RatingMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { RatingProduct as RatingProductMapping } from './mapping.js'
///
// const pretty = (user) => {
//         console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
//     const data = {}
//     data.id = user.id
//     data.products = []
//     if (user.products) {
//         data.products = user.products.map(item => {
//             return {
//                 id: item.id,
//                 //name: item.name, //не понадобиться
//                 //price: item.price,
//                 rate: item.user_product.rate
//                 //quantity: item.basket_product.quantity
//             }
//         })
//     }
//     return data
// }


/// //   ЭТО ПРОМУЖУТОЧНАЯ ТАБЛИЗА RATING ТАК кАК связана С useriD PRODUCTiD КАК И У BASKETdevice BASKETiD PRODUCTiD
class Rating {
    async getOne(ratingId, productId) {
        //  let ratings= await RatingMapping.findByPk(ratingId, {
        //      attributes:['id']
        //  })
        //  if(!ratings){
        //      ratings= await RatingMapping.create()
        //  }

        // let rating = await RatingMapping.findByPk(ratingId,{
        //     attributes:['id']
        // })
         //const votes = await ProductMapping.count({where: {id:productId}})
         const votes = await RatingProductMapping.count({where:{productId,ratingId}})  
         //find on ratingMapping because in productMaping doesnot true count with rating get
         //rating need to save in coockie
         if (votes) {
             const rates = await RatingProductMapping.sum('rate', {where: {ratingId, productId}})
             const rate= await RatingProductMapping.findOne({where: {ratingId, productId}})
             let grade=0
             if(rate){
                 grade=rate.rate
             }
                return {grade, votes, rating: rates/votes}
         }
         return {grade:0, votes:0, rating:0}
        // let user = await UserMapping.findByPk(userId, {
        //     attributes: ['id'],
        //     include: [
        //         {model: ProductMapping, attributes: ['id', 'name', 'price']},
        //     ],
        // })
        
        //return pretty(user)

     }

    async create() {
        const rating = await RatingMapping.create()
        
        return rating
    }

    async update(productId,rate,ratingId){
        console.log('-------------------------------------------------------------qqqqqqqqqqqqqqqqqqqqqqq') 
        let rating = await RatingMapping.findByPk(ratingId,{
            attributes:['id']
        })
        if(!rating){
            rating = await RatingMapping.create()
        }
        const rating_product= await RatingProductMapping.findOne({
            where:{ratingId, productId}
        })
        if(rating_product){
             rating_product.rate= parseFloat(rate)
             
        }else{
            await RatingProductMapping.create({ratingId, productId, rate})
            await ProductMapping.update('rating',  )
        }

        await rating.reload()
        return rate
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

        console.log('-----------------------------------------------------------------------------------------------')
        console.log('##############################################################################################################')
        // if (!basket) {
        //     basket = await Mapping.create()
        // }
        // проверяем, есть ли уже этот товар в корзине
        const user_product = await RatingMapping.findOne({
            where: {userId, productId}
        })
        console.log('*************************************************************************************')
             const parseRate= parseFloat(rate)
        if (user_product) { // есть в корзине
            user_product.rate= parseRate
            await user_product.save()
            //await ProductMapping.update({rate})
        } else { // нет в корзине
             await RatingMapping.create({productId, userId, rate})//save in user
        }
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        return parseRate;
        // обновим объект корзины, чтобы вернуть свежие данные
        //await user.reload()

        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

    }
}

export default new Rating()