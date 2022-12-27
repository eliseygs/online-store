import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import '../styles/components/ProductItem.scss'
const ProductItem = ({data}) => {
    const navigate = useNavigate()
    return (
        <Col xl={3} lg={4} sm={6} className="mt-3" onClick={() => navigate(`/product/${data.id}`)}>
            <Card style={{width: 200, cursor: 'pointer'}}>
                {data.image ? (
                    <Card.Img variant="top" src={process.env.REACT_APP_IMG_URL + data.image} />
                ) : (
                    <Card.Img variant="top" src="http://via.placeholder.com/200" />
                )}
                <Card.Body style={{height: 100, overflow: 'hidden'}}>
                    <p>Бренд: {data.brand.name}</p>
                    <div className='d-flex'>
                    <strong>{data.name}</strong>
                        <div className="ms-auto m">
                            <strong >{data.rating}</strong>
                            <img style={{height:39, width:39}} className="mb-1" src="https://img.freepik.com/free-vector/start_53876-25533.jpg" />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductItem