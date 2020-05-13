import React ,{ useState, useEffect } from 'react';
import axios from "axios"
import Bar from './Bar';
import BasketItem from './BasketItem'
import "../css/basket.min.css"
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
    
    useEffect(() => {
        console.log(session)
        const data = {
            url: "https://ecommerce100.herokuapp.com/api/products/22/",
            quantity: 1,
        }
        session.post('https://ecommerce100.herokuapp.com/add-product/',data)
        .then(res =>{
            console.log(res.data)
        })
        session.get('https://ecommerce100.herokuapp.com/api/basket/')
            .then(
                result =>{
                    console.log(result.data.lines)
                    session.get(result.data.lines)
                    .then(res =>{
                        console.log(res.data)
                        setArray(res.data)
                        
                    })
                }
            )
        
    }, []);
    
    const list = array.map((item,key)=><BasketItem items={item}/>)
    
    return (
        <div className="basket">
            <h1>saddsasaddsa</h1>
            <Bar />
            <div className="basket__title">
                <div className="basket__title__h1">
                    <h1>Twój koszyk</h1>
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
                    
                    {/* <BasketItem />
                    <BasketItem /> */}
                    {list}

                    <tr>
                        <th className="product"><i class="fa fa-times-circle fa-2x" aria-hidden="true"></i><img src="http://127.0.0.1:8000/static/fashion.jpg/"></img><span className="product">Tytuł produktu</span></th>
                        <th className="price"><span className="price">50.99 </span></th>
                        <th className="quantity"><span className="quantity"><i class="fa fa-minus" aria-hidden="true"></i>1<i class="fa fa-plus" aria-hidden="true"></i></span></th>
                        <th className="summary"><span className="summary">50.99</span></th>
                        
                    </tr>
                    
                    <tr>
                        <th className="product"><i class="fa fa-times-circle fa-2x" aria-hidden="true"></i><img src="http://127.0.0.1:8000/static/fashion.jpg/"></img><span className="product">Tytuł produktu</span></th>
                        <th className="price"><span className="price">50.99 </span></th>
                        <th className="quantity"><span className="quantity"><i class="fa fa-minus" aria-hidden="true"></i>1<i class="fa fa-plus" aria-hidden="true"></i></span></th>
                        <th className="summary"><span className="summary">50.99</span></th>
                        
                    </tr>
                    <tr>
                        <th className="product"><i class="fa fa-times-circle fa-2x" aria-hidden="true"></i><img src="http://127.0.0.1:8000/static/fashion.jpg/"></img><span className="product">Tytuł produktu</span></th>
                        <th className="price"><span className="price">50.99 </span></th>
                        <th className="quantity"><span className="quantity"><i class="fa fa-minus" aria-hidden="true"></i>1<i class="fa fa-plus" aria-hidden="true"></i></span></th>
                        <th className="summary"><span className="summary">50.99</span></th>
                        
                    </tr>
                </tbody>
                </table>
            </div>
            <div className="summary">
                <div className="summary__firstrow">
                    <span id="total">Wartość twojego zamówienia (bez dostawy): 100zł</span> 
                </div>
                
            </div>
            <div className="summary2">
                <div className="summary2__secondrow">
                    <div className="summary2__secondrow__back">
                        Kontynnuj zakupy
                    </div>
                    <div className="summary2__secondrow__forward">
                        Dalej
                    </div>
                     
                </div>
            </div>
            
        </div>
    );
};
export default Basket;
