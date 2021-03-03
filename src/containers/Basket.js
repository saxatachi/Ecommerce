import React ,{ useState, useEffect } from 'react';
import axios from "axios"
import Bar from './Bar';
import BasketItem from './BasketItem'
import {getBasket} from "../store/actions/items";
import { useHistory } from 'react-router-dom';
import "../css/basket.min.css"
import { connect } from 'react-redux';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});

const configAxios = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        
     },
};
const Basket = props => {
    const [countries, setCountries] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const [array, setArray] = useState([]);
    const [lastDelete, setlastDelete] = useState();
    const [total,setTotal] = useState();
    const [fullitem,setfullitem]= useState();
    const [del,setdel]=useState(false)
    const history = useHistory();
    // useEffect(() => {
    //     console.log(session)
    //     const data = {
    //         url: "https://ecommerce100.herokuapp.com/api/products/22/",
    //         quantity: 1,
    //     }
    //     session.post('https://ecommerce100.herokuapp.com/add-product/',data)
    //     .then(res =>{
    //         console.log(res.data)
    //     })
    //     session.get('https://ecommerce100.herokuapp.com/api/basket/')
    //         .then(
    //             result =>{
    //                 setTotal(result.data.total_incl_tax)
    //                 session.get(result.data.lines)
    //                 .then(res =>{
    //                     setArray(res.data)
    //                 })
    //             }
    //         )
    // }, []);
    useEffect(()=>{
        session.get('http://127.0.0.1:8000/api/basket/')
            .then(
                result =>{
                    console.log("resultatowa data")
                    console.log(result.data)
                    setTotal(result.data.total_incl_tax)
                    session.get(result.data.lines)
                    .then(res =>{
                        console.log("rezultatowa linia")
                        console.log(res.data)
                        setArray(res.data)
                        
                    })
                }
            )
    },[del])
    const handleBack=()=>{
        history.push('/shop/')
    }
    const handleForward=()=>{
        history.push('/payments/')
    }
    const handleDelete=()=>{
        setdel(!del)
        session.get('http://127.0.0.1:8000/api/basket/')
            .then(res=>{
                console.log(res.data)
            })
        
    }
    const handleTotal=() =>{
        session.get('http://127.0.0.1:8000/api/basket/')
            .then(
                result =>{
                    setTotal(result.data.total_incl_tax)
                }
            )
    }

    let list = array.map((item,key)=><BasketItem del={handleDelete} handle={handleTotal} allitems={array} items={item} key={key}/>)
    return (
        <div className="basket">
            <h1>saddsasaddsa</h1>
            <Bar />
            <div className="basket__title">
                <div className="basket__title__h1">
                    Twój koszyk
                </div>
            </div>
            <div className="basket__table">
                <table>
                <thead>
                    <tr>
                        <th className="headproduct">Produkt</th>
                        <th className="headprice">Cena</th>
                        <th className="headquantity">Ilość</th>
                        <th className="headsummary">Razem</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
                </table>
            </div>
            <div className="summary">
                <div className="summary__firstrow">
                    <span id="total">Wartość twojego zamówienia (bez dostawy): {total} zł</span> 
                </div>
                
            </div>
            <div className="summary2">
                <div className="summary2__secondrow">
                    <div onClick={handleBack} className="summary2__secondrow__back">
                        Kontynnuj zakupy
                    </div>
                    <div onClick={handleForward} className="summary2__secondrow__forward">
                        Dalej
                    </div>
                     
                </div>
            </div>
            
        </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Basket);
