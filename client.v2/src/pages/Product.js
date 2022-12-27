import { Container, Row, Col, Button, Image, Spinner, Table } from 'react-bootstrap'
import { useEffect, useState, useContext, useMemo, useCallback } from 'react'
import { fetchOneProduct, fetchProdRating} from '../http/catalogAPI.js'
import { useNavigate, useParams } from 'react-router-dom'
import { append } from '../http/basketAPI.js'
import { AppContext } from '../components/AppContext.js'
import { observer } from 'mobx-react-lite'
import Rating from '../components/Rating/Rating.js'
import { appendProdGrade, fetchProdGrade } from '../http/userAPI.js'
import '../styles/pages/Product.scss'
const Product = observer(() => {
    const { id } = useParams()
    const { basket } = useContext(AppContext)
    const { user } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const [rating, setRating] = useState(null)
    const [grade, setGrade] = useState(null)
    // const [grade, setGrade] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        fetchProdGrade(id).then(data => setGrade(data)).catch(data => setGrade(0))
        // fetchProdRating(id).then(data => setRating(data))
    }, [id])

    useEffect(() => {
        fetchProdRating(id).then(data => setRating(data)).catch(data => setRating({votes:0, rating:0}))
        // fetchProdRating(id).then(data => setRating(data))
    }, [id, grade])



    const handleClick = (productId) => {
        append(productId).then(data => {
            basket.products = data.products
        })
    }


     const gradeProdChanged = (rate)=>{
            console.log(user.isAuth) 
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa') 
    //     setUserRating(rate)
    //     console.log('aaaaa')
    //     console.log(localStorage.getItem('token'))
           {!user.isAuth ?
            navigate(`/login`)
            :
            appendProdGrade(id, rate).then(data=> setGrade(data))
            //parseFloat
                 //catalog.grade = data
           }
             //user.products = data.products
             //catalog.products = data.products

             //console.log(data.products)
         
    // }
     }
    if (!product) {
        return <Spinner animation="border" />
    }



    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col lg={4}>
                    {product.image ? (
                        <Image width={300} height={300} src={process.env.REACT_APP_IMG_URL + product.image} />
                    ) : (
                        <Image width={300} height={300} src="http://via.placeholder.com/300" />
                    )}
                </Col>
                <Col lg={8}>
                    <h1>{product.name}</h1>
                    <h3>{product.price}.00 руб.</h3>
                    <p>Бренд: {product.brand.name}</p>
                    <p>Категория: {product.category.name}</p>
                    <div>
                        {/* {(grade !== null)  && rating ? <Rating rating={rating.rating} votes={rating.votes} onChangeValue={gradeProdChanged} defaultState={grade}/> */}
                        {grade !=null && rating ? <Rating rating={rating.rating} votes={rating.votes} onChangeValue={gradeProdChanged} defaultState={Number(grade)}/>
                        :
                        <Spinner animation='border'/>}
                    </div>
                    <Button onClick={() => handleClick(product.id)}>Добавить в корзину</Button>
                </Col>
            </Row>
            {!!product.props.length &&
                <Row>
                    <Col>
                        <h3>Характеристики</h3>
                            <Table bordered hover size="sm">
                                <tbody>
                                    {product.props.map(item => 
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.value}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                    </Col>
                </Row>
            }
        </Container>
    )
}
)
export default Product