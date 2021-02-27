import React, { Component,useState,useEffect } from 'react'
import {connect} from 'react-redux'
import "../css/profile.min.css"
import Bar from './Bar'
import DefaultView from './DefaultView'
import PersonalData from './PersonalData'
import AddressData from './AddressData'
import AddAddress from './AddAddress'
import OrderHistory from './OrderHistory'
import Review from './Review'
import axios from 'axios'
import Historyorderitem from './Historyorderitem'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});

const Profile = () => {
    useEffect(()=>{
        session.get("http://127.0.0.1:8000/api/useraddresses/")
            .then(res=>{
                console.log(res.data)
                setsessionaddress(res.data)
            })
    },[])
    const [sessionaddress,setsessionaddress] = useState(null)  
    const [personal, setpersonal] = useState(true);
    const [address, setaddress] = useState(false);
    const [addaddress, setaddaddress] = useState(false);
    const [history, sethistory] = useState(false);
    const [historyorderitem,sethistoryorderitem] = useState(false)
    const [review,setreview]= useState(false);
    const [item,setitem]= useState(null)
    const handlePersonal =() =>{
        console.log("handle Personal")
        sethistoryorderitem(false)
        setpersonal(true)
        setaddress(false)
        setaddaddress(false)
        sethistory(false)
        setreview(false)
        
    }
    const handleAddress = ()=>{
        console.log("handle Address")
        sethistoryorderitem(false)
        setpersonal(false)
        setaddress(true)
        setaddaddress(false)
        sethistory(false)
        setreview(false)
        
        
    }
    const handleAddAddress = () =>{
        console.log("handle AddAddress")
        sethistoryorderitem(false)
        setpersonal(false)
        setaddress(false)
        setaddaddress(true)
        sethistory(false)
        setreview(false)
        
    }
    const handleHistory = () =>{
        console.log("handle handleHistory")
        sethistoryorderitem(false)
        setpersonal(false)
        setaddress(false)
        setaddaddress(false)
        sethistory(true)
        setreview(false)
        
    }
    const handleReview = ()=>{
        sethistoryorderitem(false)
        setpersonal(false)
        setaddress(false)
        setaddaddress(false)
        sethistory(false)
        setreview(true)
    }
    const handleOrderClick = (item) =>{
        console.log("przycisk został kliknięty")
        sethistory(false)
        sethistoryorderitem(true)
        setitem(item)
    }
    
        return (
        <div classname="main">
            <div className="navbar"></div>
                <div className="profile">
                    <Bar />
                    <div className="profile__suggestions">
                        <div className="profile__suggestions__list">
                            <div className="profile__suggestions__list__title">
                                <h1>Moje Konto</h1>
                            </div>
                            <ul>
                                <div className="profile__suggestions__list__li" onClick={handlePersonal}><li>Zmiana Hasła</li></div>
                                <div className="profile__suggestions__list__li" onClick={handleAddress}><li>Dane Adresowe</li></div>
                                <div className="profile__suggestions__list__li" onClick={handleAddAddress}><li>Dodaj Dane Adresowe</li></div>
                                <div className="profile__suggestions__list__li" onClick={handleHistory}><li>Historia Zamówień</li></div>
                                <div className="profile__suggestions__list__li" onClick={handleReview}><li>Recenzje produktów</li></div>
                            </ul>
                        </div>
                    </div>
                    <div className="profile__data">
                        
                        {personal === true && <PersonalData />}
                        {address === true && <AddressData address={sessionaddress}/>}
                        {addaddress === true && <AddAddress />}
                        {history === true && <OrderHistory handleOrderClick={handleOrderClick}/>}
                        {historyorderitem === true && <Historyorderitem item={item} handleHistory={handleHistory} />}
                        {review === true && <Review />}
                        
                    </div>
                </div>
            
        </div>
    );
};

export default Profile;