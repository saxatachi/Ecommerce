import React, { Component } from 'react'
import "../css/personaldata.min.css"
 class PersonalData extends Component {
    render() {
        return (
            <div className="personaldata">
                <div className="personaldata__title">
                    <h1>Twoje dane Osobiste</h1>
                </div>
                <div className="personaldata__form">
                    <label><span>Imię</span></label>
                    <input type="text" placeholder="Imię"></input>
                    <label><span>Nazwisko</span></label>
                    <input type="text" placeholder="Nazwisko"></input><br />
                    <label><span>Adres email</span></label>
                    <input type="text" placeholder="Adres email"></input><br />
                    <label><span>Numer telefonu</span></label>
                    <input type="text" placeholder="Numer telefonu"></input><br />
                    <h2>Zmiana hasła</h2>
                    <label><span>Obecne hasło</span></label>
                    <input type="text" placeholder="obecne hasło"></input><br />
                    <label><span>Nowe hasło</span></label>
                    <input type="text" placeholder="nowe hasło"></input><br />
                    <label><span>Potwierdź nowe hasło</span></label>
                    <input type="text" placeholder="Potwierdź nowe hasło"></input><br />
                </div>
            </div>
        )
    }
}
export default PersonalData;