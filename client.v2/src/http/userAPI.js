import { guestInstance, authInstance } from './index.js'
import jwtDecode from 'jwt-decode'

export const signup = async (email, password) => {
    try {
        const response = await guestInstance.post('user/signup', {email, password, role: 'ADMIN'})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}

export const login = async (email, password) => {
    try {
        const response = await guestInstance.post('user/login', {email, password})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const check = async () => {
    let userToken, userData
    try {
        userToken = localStorage.getItem('token')
        // если в хранилище нет действительного токена
        if (!userToken) {
            return false
        }
        // токен есть, надо проверить его подлинность
        const response = await authInstance.get('user/check')
        userToken = response.data.token
        userData = jwtDecode(userToken)
        localStorage.setItem('token', userToken)
        return userData
    } catch(e) {
        localStorage.removeItem('token')
        return false
    }
}

export const fetchProdGrade = async (id) => {
    const { data } = await authInstance.get(`user/productId/${id}`)
    return data
}

export const appendProdGrade = async (id, rate) => {
    const { data } = await authInstance.post(`user/productId/${id}/grade/${rate}`)
    return data
}