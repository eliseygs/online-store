import { Container, Row, Col, Button, Image, Spinner, Table } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { appendProdRating, fetchOneProduct, fetchProdRating } from '../http/catalogAPI.js'
import { useParams } from 'react-router-dom'
import { append } from '../http/basketAPI.js'
import { AppContext } from '../components/AppContext.js'
import ReactStars from "react-rating-stars-component"
const Product = () => {
    const { id } = useParams()
    const { basket } = useContext(AppContext)
    const { catalog } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const [rating, setRating] = useState(null)

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [id])

    useEffect(() => {
        fetchProdRating(id).then(data => setRating(data))
    }, [id])

    const handleClick = (productId) => {
        append(productId).then(data => {
            basket.products = data.products
        })
    }

    if (!product) {
        return <Spinner animation="border" />
    }

     const ratingChanged = (rate)=>{
    //     setUserRating(rate)
    //     console.log('aaaaa')
    //     console.log(localStorage.getItem('token'))
           appendProdRating(id, rate).then(data =>{
                 //catalog.grade = data
                 rating.rate = data
           }
           )
             //user.products = data.products
             //catalog.products = data.products

             //console.log(data.products)
         
    // }
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
                            <ReactStars
                                count={5}
                                value={catalog.grade}
                                onChange={ratingChanged}
                                size={24}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                              />
                        {rating ? (
                            <p> {rating.rate} Рейтинг: {rating.rating}, голосов {rating.votes}</p>
                        ) : (
                            <Spinner animation="border" />
                        )}
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

export default Product