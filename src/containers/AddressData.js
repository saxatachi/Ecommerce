import React, { Component,useEffect,useState } from 'react'
import "../css/addressdata.min.css"
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
const AddressData = (props) => {
    console.log(props.address)
    const AddressIs=(props)=>{
        console.log(props.item)
        useEffect(()=>{
            console.log(props.item)
            session.get(props.item.country)
                .then(res=>{
                    console.log(res.data)
                    setcountry(res.data.printable_name)
                })
        })
        const [country,setcountry] = useState(null)  
        return(
       <>
            
            {/* <p>Skonfiguruj proszę swoje domyślne adresy dla rozliczeń i dostaw podczas składania zamówienia. Możesz także dodać inne adresy, co może być użyteczne przy wysyłaniu prezentów lub odbieraniu zamówienia w miejscu pracy w zakładce Dodaje dane adresowe.</p>
            <p>Poniżej znajdują się twoje adresy</p> */}
            <div className="address">
                <div className="myaddress">Mój adres</div>
                <a>Imię i nazwisko: {props.item.first_name} {props.item.last_name}</a>
                <a>Nazwa ulicy: {props.item.line1}</a>
                <a>Numer domu {props.item.line2}:</a>
                <a>Kod pocztowy {props.item.postcode}:</a>
                <a>Miasto : {props.item.line3} </a>
                <a>Kraj: {country}</a>
                <a>Numer telefonu: {props.item.phone_number}</a>
                <div className="address__buttons">
                    {/* <button>Uaktualnij</button> */}
                    <button >Usuń</button>
                </div>  
                  
            </div>
            
        </>
    )}
    const addressIsNull=(
        <>
            <p>NIestety nie posiadamy jeszcze twojego adresu. Skonfiguruj proszę swoje domyślne adresy poprzez kliknięcie na przycisk znajdujący się w menu z lewej strony</p>
        </>
    )
    return (
        <div className="main-profile">
            <div className="main-profile__title">
                <h1>Moje Adresy</h1>
            </div>
            <div className="main-address">
                {props.address.length >0 ?props.address.map((item,key)=><AddressIs item={item}/>):addressIsNull}
            </div>
            {/* <div className="address-addbutton">
                <button>Dodaj nowy adres</button>   
            </div> */}
        </div>
    );
};

export default AddressData;