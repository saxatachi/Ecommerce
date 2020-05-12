import React, { Component } from 'react'
import "../css/addaddress.min.css"
class AddAddress extends Component {
    render() {
        return (
            <div className="addaddress">
                <h1>TWÓJ ADRES</h1>
                <p>Aby dodać nowy adres, wypełnij poniższy formularz</p>
                *Pole wymagane
                <label><span>Imię</span></label>
                <input placeholder="Imię"/>
                <label><span>Nazwisko</span></label>
                <input placeholder="Nazwisko"/>
                <label><span>Nazwa firmy</span></label>
                <input placeholder="Nazwa Firmy"/>
                <label><span>Ulica</span></label>
                <input placeholder="Ulica"/>
                <label><span>Nr domu</span></label>
                <input placeholder="Nr domu"/>
                <label><span>Kod pocztowy</span></label>
                <input placeholder="Kod Pocztowy"/>
                <label><span>Miejscowość</span></label>
                <input placeholder="Miejscowość"/>
                <button>Zapisz</button>
            </div>
        )
    }
}
export default AddAddress