import React,{useEffect,useState} from 'react';
import axios from 'axios'
import "../css/orderhistory.min.css"
const session = axios.create({
	withCredentials: true
});

const Historyorderitem = (props) => {
    const [items,setitems] = useState([])
    console.log(props.item)
    const handlebacktohistory = () =>{
        console.log("powrót")
        props.handleHistory()
    }
    useEffect(() => {
        session.get(props.item.lines)
        .then(res=>{
        console.log(res.data)
        let list = res.data.map((item,key)=><Historyorderitems  item={item} key={key}/>)
        console.log(list)
        setitems(list)
    })
        
    }, [])
    
    
    return (
        <div className="historyorder">
            <h1>Zrealizowane</h1>
            {items}
            <button onClick={props.handleHistory}>Wróć do historii zamówień</button>
        </div>
    );
};

export default Historyorderitem;

const Historyorderitems = (props) => {
    console.log(props.item)
    const [image,setimage] = useState(null)
    const [title,settitle]= useState(null)
    const [quantity,setquantity]= useState(null)
    
    const [name,setname] = useState()
    session.get(props.item.product)
    .then(res=>{
        console.log(res.data)
        settitle(res.data.title)
        setimage(res.data.images[0].original)
    })
    return (
        <div className="historyorder__item">
            <div className="historyorder__item-img">
                <img className="orderitem-image" src={image} />
            </div>
            <div className="historyorder__item__midsection">
                <div className="historyorder__item__midsection-title">
                    {title}
                </div>
                <div className="historyorder__item__midsection-quantity">
                    Ilość {props.item.quantity}
                </div>
            </div>
            <div className="historyorder__item-price">
                {props.item.price_incl_tax} zł
            </div>
            
        </div>
    );
};

