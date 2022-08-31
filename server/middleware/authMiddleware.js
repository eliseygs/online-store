import jwt from 'jsonwebtoken'
import AppError from '../errors/AppError.js'

const decode = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return decoded
    } catch(e) {
        throw new Error('Неверная подпись токена')
    }
}

const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
        const token = req.headers.authorization.split('Bearer ')[1] // Bearer token
        //const token = req.headers.authorization?.split(' ')[1] // Bearer token
        console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
        if (!token) {
            throw new Error('Требуется авторизация')
        }
        const decoded = decode(token)
        req.user = decoded
        next()
    } catch (e) {
        next(AppError.forbidden(e.message))
    }
}

export default auth