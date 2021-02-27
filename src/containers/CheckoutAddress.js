import React,{useEffect,useState} from 'react';
import axios from 'axios';
import "../css/checkout.min.css";
import { connect } from 'react-redux';
import {getUserAddress} from "../store/actions/checkout";
import {getItems, getBasket} from "../store/actions/items";
import AddAddress1 from './AddAddress1';


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
const AddressItem = (props) => {
        
        useEffect(()=>{
            console.log(props.address)
            setid(props.item.id)
            session.get(props.item.country)
                .then(res=>{
                    setcountry(res.data.printable_name)
                })
        })

        const [country,setcountry] = useState(null)
        const [id,setid]= useState(null)
        const handleClick =()=>{
            props.setstatenumber(1)
            console.log(id)
            console.log(props.address)
            let identity = props.address.find(x => x.id === id)
            console.log(identity)     
            props.getUserAddress(identity)
            
            
        }
    return (
        
        <div className="checkout__address">
                <br/>
                <div className="checkout__myaddress">Mój adres</div>
                <br/>
                <a className="checkout__name">Imię i nazwisko: {props.item.first_name} {props.item.last_name}</a>
                <br/>
                <a className="checkout__street">Nazwa ulicy: {props.item.line1}</a>
                <br/>
                <a className="checkout__home">Numer domu {props.item.line2}:</a>
                <br/>
                <a className="checkout__postcode">Kod pocztowy {props.item.postcode}:</a>
                <br/>
                <a className="checkout__city">Miasto : {props.item.line3} </a>
                <br/>
                <a className="checkout__country">Kraj: {country}</a>
                <br/>
                <a className="checkout__phone">Numer telefonu: {props.item.phone_number}</a>
                <br/>
                <div className="address__buttons">
                    <button className="btn-1" onClick={handleClick}>Wybierz</button>
                </div>  
                  
            </div>
        
    );
};
const CheckoutAddress = (props) => {
    const [address,setaddress] = useState([])
    const [addres,setaddres] = useState()
    useEffect(() => {
        
        session.get('http://127.0.0.1:8000/api/login/')
        .then(res=>{
            console.log(res.data)
            if(res.data !== ""){
                session.get('http://127.0.0.1:8000/api/useraddresses/')
                .then(res=>{
                    console.log("sprawdzenie")
                    props.getUserAddress()
                    setaddress(res.data)
                    if(res.data.length>0){
                        setaddres(res.data.map((item,key)=><AddressItem getUserAddress={props.getUserAddress} address={res.data} item={item} key={key} setstatenumber={props.setstatenumber} setbarnumber={props.setbarnumber} barnumber={props.barnumber}/>))  
                     }
                     else{
                         setaddres(<AddAddress1 setstatenumber={props.setstatenumber}/>)
                     }
                })
            }else{
                setaddres(<AddAddress1 setstatenumber={props.setstatenumber}/>)
            }
        })
        // session.get('http://127.0.0.1:8000/api/useraddresses/')
        // .then(res=>{
        //     console.log("sprawdzenie")
        //     props.getUserAddress()
        //     setaddress(res.data)
        //     if(res.data.length>0){
        //         setaddres(res.data.map((item,key)=><AddressItem getUserAddress={props.getUserAddress} address={res.data} item={item} key={key} setstatenumber={props.setstatenumber} setbarnumber={props.setbarnumber} barnumber={props.barnumber}/>))  
        //      }
        //      else{
        //          setaddres(<AddAddress1 setstatenumber={props.setstatenumber}/>)
        //      }
        // })
        
        
    }, [])
    return (
        <div className="checkout__add">
            {addres}
            
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

const mapDispatchToProps = () =>dispatch => {
    return {
      getUserAddress: (x)=>dispatch(getUserAddress(x)),
      getBasket: () =>dispatch(getBasket())
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(CheckoutAddress); 