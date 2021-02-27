import React ,{ useState, useEffect } from 'react';
import axios from "axios"
import PropTypes from 'prop-types'
import "../css/basketitem.min.css"
import {getBasket} from "../store/actions/items";
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
const BasketItem = props => {
    let history= useHistory()
    const singlePrice =  props.items.price_incl_tax / props.items.quantity 
    const [Image, setImage] = useState('');
    const [quantity, setQuantity] = useState(props.items.quantity);
    const [singleSummary, setSingleSummary] = useState(props.items.price_incl_tax)
    const [work,setWork] = useState(props.items.price_incl_tax / props.items.quantity)
    const [total,setTotal] = useState()
    const [delete1,setDelete] = useState(false)
    const [title,setTitle]= useState('')
    const [id,setid]= useState(null)
    session.get(`${props.items.product}`)
        .then(
            res=>{
                setTitle(res.data.title)
                if(res.data.images.length > 0){
                    setImage(res.data.images[0].original)
                }
                
                
            }
        )
    useEffect(()=>{
        session.get(`${props.items.product}`)
        .then(
            res=>{
                setTitle(res.data.title)
                setid(res.data.id)
                if(res.data.images.length > 0){
                    setImage(res.data.images[0].original)
                }
            }
        )
    },[])
    useEffect(()=>{
        let data ={
            "quantity": quantity
        }
        session.patch(props.items.url,data)
            .then(res =>{
                setSingleSummary(res.data.price_incl_tax)
                props.handle()
            })
        
    },[quantity])
    const handleDelete=async()=>{
        await session.delete(props.items.url)
            .then(res=>{
                console.log(res.data)
            })
        await props.del()
        await props.getBasket()
        // setDelete(!delete1)
    }
    const handleMovetoProduct = () =>{
        console.log("handleMOve to Product")
        console.log(props.items)
        history.push({
            pathname: `/item/${id}`
        })
    }
    
    return (
        <>
            <tr>
                <th className="product" onClick={handleMovetoProduct}><div className="product__img"><i onClick={handleDelete} class="fa fa-times-circle fa-2x" aria-hidden="true"></i></div><img src={Image}></img><span className="product">{title}</span></th>
                <th className="price"><span className="price">{props.items.price_incl_tax / props.items.quantity } zł</span></th>
                <th className="quantity"><span className="quantity"><i onClick={() => setQuantity(quantity-1)} class="fa fa-minus" aria-hidden="true"></i>{quantity}<i onClick={() => setQuantity(quantity+1)}class="fa fa-plus" aria-hidden="true"></i></span></th>
                <th className="summary"><span className="summary">{singlePrice * quantity} zł</span></th>
                
            </tr>
        </>
    );
};
const mapStateToProps = state => {
    return {
   
    allitems : state.items.allitems,
    selecteditems : state.items.selecteditems.items,
    default : state.items.default
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getBasket: () =>dispatch(getBasket())
  
    };
}
export default  connect(mapStateToProps,mapDispatchToProps)(BasketItem);