import { User as UserMapping } from './mapping.js'
import { UserProduct as UserProductMapping } from './mapping.js'
import {Product as ProductMapping} from './mapping.js'
import pkg from 'sequelize'
const { Op } = pkg;

const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true

const pretty = (user) => {
    const data = {}
    data.id = user.id
    data.grades = []
    if (user.products) {
        data.grades = user.products.map(item => {
            return {
                id: item.id,
                productId: item.user_product.productId,
                //name: item.name, //не понадобиться
                //price: item.price,
                rate: item.user_product.rate
                //quantity: item.basket_product.quantity
            }
        })
    }
    return data
}
class User {
    async getAll() {
        const users = await UserMapping.findAll()
        return users
    }

    async getOne(id) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }

    async getByEmail(email) {
        const user = await UserMapping.findOne({where: {email}})
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }

    async create(data) {
        const {email, password, role} = data
        const check = await UserMapping.findOne({where: {email}})
        if (check) {
            throw new Error('Пользователь уже существует')
        }
        const user = await UserMapping.create({email, password, role})
        return user
    }

    async update(id, data) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        const {
            email = user.email,
            password = user.password,
            role = user.role
        } = data
        await user.update({email, password, role})
        return user
    }

    async delete(id) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        await user.destroy()
        return user
    }

    async getGrade(userId, productId) {
             const user_product= await UserProductMapping.findOne({where:{userId, productId}})
             if(user_product){
                return user_product.rate
             }else{
                await UserProductMapping.create({userId, productId})
                return 0
             }
            //  const user_product= await UserProductMapping.findOne({where:{userId, productId}})
            //  if(user_product){
            //     const votes = await UserProductMapping.count({where:{productId, rate:{[Op.gt]: 0}}})
            //     const product= await ProductMapping.findOne({where:{id:productId}})
            //     return {grade: user_product.rate, votes:votes, rating: product.rating} 
            //  }else{
            //     await UserProductMapping.create({userId, productId})
            //     return {grade:0,votes:0, rating:0} 
            //  }
     
    }
    async updateGrade(productId,grade,userId){
        let user_product= await UserProductMapping.findOne({where:{userId, productId}})
        if(user_product){
             user_product.rate= grade
             await user_product.save()
             const votes = await UserProductMapping.count({where:{productId, rate:{[Op.gt]: 0}}})
             if(votes){
                const rates = await UserProductMapping.sum('rate', {where:{productId}})
                const product= await ProductMapping.findByPk(productId)
                product.rating= rates/votes
                await product.save()
             }else{
                const product= await ProductMapping.findByPk(productId)
                product.rating= grade
                await product.save()
             }
             return user_product.rate
        }
    }
    

}

export default new User()