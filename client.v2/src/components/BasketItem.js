import { useContext } from 'react';
import { Button } from 'react-bootstrap'
import { AppContext } from './AppContext';
import { observer } from 'mobx-react-lite'
import basket from '../assets/img/basket.png'
import '../styles/components/BasketItem.scss'
const BasketItem = observer((props) => {
    return (
        <div className='basketitem' >
            { props.image ? (
                    <img className="basketitem__background" src={process.env.REACT_APP_IMG_URL + `${props.image}`} />
            ) : (
                <img src="http://via.placeholder.com/200" />
            )}  
            <div className='basketitem__img' >
                {/* <img className='basketitem__img__background' src={process.env.REACT_APP_IMG_URL + `${props.image}`} /> */}
                {/* {(catalog.products[0] && catalog.products[0].image) ? ( */}
                { props.image ? (
                    // <div>
                    // <div className='d-flex flex-column' style={{alignItems:'center'}}>
                    //     <div>kjshf</div>
                    //     <div>kjshf</div>
                    // </div>
                    // <div style={{display:'inline-flex'}} >aaaaaaaaa</div>
                    // <div style={{display:'inline-flex'}} >aaaaaaaaaa</div>
                    // <div style={{display:'inline-flex'}} >aaaaaaaaaaaa</div>
                    // <div >asdf</div>
                    // <div >asdf</div>
                    // </div>
                        <img className="basketitem__img__mainimg" src={process.env.REACT_APP_IMG_URL + `${props.image}`} />
                ) : (
                    <img src="http://via.placeholder.com/200" />
                )}
                    </div>

                <div className='basketitem__description'>
                    <div className='basketitem__description__category'>
                        <div> {props.name}</div>
                        <div>price</div>
                        <div>total</div>
                    </div>
                    <div className='basketitem__description__definite'>
                                <div className='basketitem__description__definite__amount'>
                                    <div className='basketitem__description__definite__amount__minus' onClick={() => props.decrement(props.id)}>-</div>
                                    <div>{props.quantity}</div>
                                    {/* <button className="basketitem__button" onClick={() => props.increment(props.id)}><div className='basketitem__button__text'>+</div> </button> */}
                                    <div className="basketitem__description__definite__amount__plus" onClick={() => props.increment(props.id)}>+ </div>
                                </div>
                            <div >{props.price} RUB</div>
                            <div >{props.price * props.quantity} RUB</div>
                    </div>
                </div>
                <div className='basketitem__basket'>
                    <div className="basketitem__basket__location" onClick={() => props.remove(props.id)}/>
                </div>
                {/* <div className="d-inline-flex flex-column "style={{background: 'yellow', width:'200px'}}>1</div> */}
            </div>
    );
})

export default BasketItem