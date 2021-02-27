import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import "../css/orderhistory.min.css"
const session = axios.create({
	withCredentials: true
});

const OrderHistory = props => {
    const [array,setarray] = useState([])
    useEffect(() => {
        session.get('http://127.0.0.1:8000/api/orders/')
        .then(res=>{
            console.log(res.data)
            setarray(res.data)
            
        })
        
    }, [])
    
    let items = array.map((item)=> <OrderHistoryItem handleOrderClick={props.handleOrderClick} item={item} />) 
    
    
    return (
        <div className="OrderHistory">
            <h1>Historia Zamówień</h1>
            {items.length>0 ? <table className="OrderHistory-table">
                <tr className="OrderHistoryItem__th">
                <th className="OrderHistoryItem__number">Numer zamówienia</th>
                <th className="OrderHistoryItem__date">Data</th>
                <th className="OrderHistoryItem__price">Cena</th>
                <th className="OrderHistoryItem__done">Realizacja</th>
                </tr>
                {items}
            </table>
            :<p>Brak jakichkolwiek zamówień. Zakup produkty w naszym sklepie</p>}
            
        </div>
    );
};

export default OrderHistory;


const OrderHistoryItem = (props) => {
    
    const date = props.item.date_placed.slice(0,10)
    console.log(props.item)
    return (
        <div className="OrderHistoryItem">
            
            <tr onClick={()=>props.handleOrderClick(props.item)}className="OrderHistoryItem__tr">
                <td className="OrderHistoryItem__number">{props.item.number}</td>
                <td className="OrderHistoryItem__date">{date}</td>
                <td className="OrderHistoryItem__price">{props.item.total_incl_tax} zł</td>
                <td className="OrderHistoryItem__done">Zrealizowane</td>
            </tr>
        </div>
    );
};