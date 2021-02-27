import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
const CheckoutOrder = props => {
    const [array,setarray] = useState([])
    useEffect(()=>{
        session.get('http://127.0.0.1:8000/api/basket/')
        .then(res=>{
            session.get(res.data.lines)
            .then(res=>{
                setarray(res.data)
            })
            
            
        })
    },[])
    let items = array.map((item)=> <CheckoutOrderItem item={item} />) 
    console.log(array)
    return (
        <div className="checkout__order__options">
            {/* <div className="checkout__order__title">Podsumowanie Zakupów</div> */}
            <div className="checkout__order__title">Podsumowanie Zakupów</div>
            <div className="checkout__order__items">
            {items}
            </div>
        </div>
    );
};

const CheckoutOrderItem = (props) => {
    const [image,setimage] = useState()
    const [title,settitle] = useState()
    console.log(props.item)
    useEffect(()=>{
        session.get(props.item.product)
        .then(res=>{
            setimage(res.data.images[0].original)
            settitle(res.data.title)
        })
    },[])
    return (
        <div className="checkout__order__item">
            <img src={image}/>
            <div className="checkout__order__item-description">
            <div className="checkout__order__item-title">
                {title}
            </div>
            <div className="checkout__order__item-quantity">Ilość : {props.item.quantity}</div>
            </div>
            <div className="checkout__order__item-price"> {props.item.price_incl_tax} zł</div>
            
        </div>
    );
};



export default CheckoutOrder;