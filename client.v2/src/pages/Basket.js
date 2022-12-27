import BasketList from '../components/BasketList.js'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useState } from 'react';

import '../styles/pages/Basket.scss'
const Basket = () => {
     const [show, setShow] = useState(true);

     const handleClose = () => setShow(false);
    return (
        <Container >
            <h1>Корзина</h1>
            <BasketList />
        </Container>
        
    )
}

export default Basket