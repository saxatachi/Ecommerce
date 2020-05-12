import React, { Component } from 'react'
import {connect} from 'react-redux'
import "../css/profile.min.css"
import Bar from './Bar'
import DefaultView from './DefaultView'
import PersonalData from './PersonalData'
import AddressData from './AddressData'
import AddAddress from './AddAddress'
class Profile extends Component {
    render() {
        return (
            <>
                <div className="navbar"></div>
                <div className="profile">
                    <Bar />
                    <div className="profile__suggestions">
                        <div className="profile__suggestions__list">
                            <div className="profile__suggestions__list__title">
                                <h1>Moje Konto</h1>
                            </div>
                            <ul>
                                <div className="profile__suggestions__list__li"><li>Dane Osobowe</li></div>
                                <div className="profile__suggestions__list__li"><li>Dane Adresowe</li></div>
                                <div className="profile__suggestions__list__li"><li>Dane Adresowe</li></div>
                                <div className="profile__suggestions__list__li"><li>Historia zamówień</li></div>
                            </ul>
                        </div>
                    </div>
                    <div className="profile__data">
                        <AddAddress />
                    </div>
                </div>
            </>    
        )
    }
}
const mapStatetoProps = state =>{
    return{
        token: state.auth.token,
        username: state.auth.user.username
    }
}
const mapDispatchtoProps = dispatch =>{
    return{
        //
    }
}
export default connect(mapStatetoProps)(Profile)