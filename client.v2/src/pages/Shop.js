import { Container, Row, Col, Spinner, Carousel } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar.js'
import BrandBar from '../components/BrandBar.js'
import ProductList from '../components/ProductList.js'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/AppContext.js'
import { fetchCategories, fetchBrands, fetchAllProducts, fetchProdRating } from '../http/catalogAPI.js'
import { observer } from 'mobx-react-lite'
import { useLocation, useSearchParams } from 'react-router-dom'
import '../styles/pages/Shop.scss'
const getSearchParams = (searchParams) => {
    let category = searchParams.get('category')
    if (category && /[1-9][0-9]*/.test(category)) {
        category = parseInt(category)
    }
    let brand = searchParams.get('brand')
    if (brand && /[1-9][0-9]*/.test(brand)) {
        brand = parseInt(brand)
    }
    let page = searchParams.get('page')
    if (page && /[1-9][0-9]*/.test(page)) {
        page = parseInt(page)
    }
    return {category, brand, page}
}

const Shop = observer(() => {
    const { catalog } = useContext(AppContext)
    const { user } = useContext(AppContext)

    const [categoriesFetching, setCategoriesFetching] = useState(true)
    const [brandsFetching, setBrandsFetching] = useState(true)
    const [productsFetching, setProductsFetching] = useState(true)

    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        fetchCategories()
            .then(data => catalog.categories = data)
            .finally(() => setCategoriesFetching(false))

        fetchBrands()
            .then(data => catalog.brands = data)
            .finally(() => setBrandsFetching(false))

        const {category, brand, page} = getSearchParams(searchParams)
        catalog.category = category
        catalog.brand = brand
        catalog.page = page ?? 1

        fetchAllProducts(catalog.category, catalog.brand, catalog.page, catalog.limit)
            .then(data => {
                catalog.products = data.rows
                catalog.count = data.count

            })
        //fetchProdRating(catalog.category, catalog.brand, catalog.page, catalog.limit)
        // fetchProdRating()
        //     .then(data => {
        //         console.log('aaaaa')
        //         user.products = data.products
        //     })
        //     .finally(() => setProductsFetching(false))
        // eslint-disable-next-line
    }, [])

    // При каждом клике на категорию, бренд или номер страницы — мы добавляем элемент в историю
    // браузера, ссылки в истории имеют вид /?page=1, /?page=2, /?page=3. При нажатии кнопки 
    // «Назад» браузера — мы отслеживаем изменение GET-параметров и изменяем состояние хранилища.
    useEffect(() => {
        const {category, brand, page} = getSearchParams(searchParams)

        if (category || brand || page) {
            if (category !== catalog.category) {
                catalog.category = category
            }
            if (brand !== catalog.brand) {
                catalog.brand = brand
            }
            if (page !== catalog.page) {
                catalog.page = page ?? 1
            }
        } else  {
            catalog.category = null
            catalog.brand = null
            catalog.page = 1
        }
        // eslint-disable-next-line
    }, [location.search])

    // при клике на категорию, бренд, номер страницы или при нажатии кнопки  «Назад» 
    // браузера — получам с сервера список товаров, потому что это уже другой список
    useEffect(() => {
        setProductsFetching(true)
        fetchAllProducts(catalog.category, catalog.brand, catalog.page, catalog.limit)
            .then(data => {
                catalog.products = data.rows
                catalog.count = data.count
            })
            .finally(() => setProductsFetching(false))
        // eslint-disable-next-line
    }, [catalog.category, catalog.brand, catalog.page])

    return (

        <div>
            <div className='item sidebar'>
                {categoriesFetching ? (
                    <Spinner animation="border" />
                ) : (
                    <CategoryBar />
                )}
            </div>
            <div className='item content'>
                <div >
                    {brandsFetching ? (
                        <Spinner animation="border" />
                    ) : (
                        <BrandBar />
                    )}
                </div>
            {/* <Carousel>
            <Carousel.Item interval={500}>
                <img
                className="d-block w-100"
                src="https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg?auto=webp&quality=95&crop=16:9&width=675"
                alt="First slide"
                />
     
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                className="d-block w-100"
                src="https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk="
                alt="Second slide"
                />
   
            </Carousel.Item>
            <Carousel.Item interval ={500}>
                <img
                className="d-block w-100"
                src="https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU="
                alt="Third slide"
                />
      
            </Carousel.Item>
            </Carousel> */}
                <div>
                    {productsFetching ? (
                        <Spinner animation="border" />
                    ) : (
                        <ProductList />
                    )}
                </div>
            </div>
            <div className='item filterbar'>
                hellooo
            </div>
        </div>
    )
})

export default Shop
