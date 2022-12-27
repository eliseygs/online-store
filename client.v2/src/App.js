import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter.js'
import NavBar from './components/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppContext } from './components/AppContext.js'
import { check as checkAuth } from './http/userAPI.js'
import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Loader from './components/Loader.js'

import { fetchBasket } from './http/basketAPI.js'

import axios from 'axios'

import "./styles/App.scss"
import Prevu from './components/Prevu.js'
const App = observer(() => {
    const { user, basket } = useContext(AppContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([checkAuth(), fetchBasket()])
            .then(
                axios.spread((userData, basketData) => {
                    if (userData) {
                        user.login(userData)
                    }
                    basket.products = basketData.products
                    //отображаются все поля products
                    //отображается общее поле quentity
                    //с помощью quentity мы выводим в basketItem
                    //нужное количество повторяющихся товаров
                })
            )
            .finally(
                () => setLoading(false)
            )
    }, [])

    // показываем loader, пока получаем пользователя и корзину
    if (loading) {
        return <Loader />
    }

    return (
        <div className="appcontainer">
            <BrowserRouter>
                <div className='prevu'>
                    <Prevu/>
                </div>
                <div className='navbar'>
                    <NavBar/>
                </div>
                {/* <div className="item sidebar">
                    hello heeeoooooooooslkkkkkkkkkkkkkkkkko
                </div>
                <div className='item filterbar'>
                    jhkefjhakdddddddddddddddddddddddddddddddddddddd
                </div> */}

                <div className='wrap'>
                    <AppRouter  />
                </div>
            <div className='item footer'>
                hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhheeeeeelllllllllllooooooooooooooo
            </div>
            </BrowserRouter>
        </div>
    )
})

export default App
