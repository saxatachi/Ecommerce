import React, { Component } from 'react'
import "../css/addressdata.min.css"
class AddressData extends Component {
    render() {
        const addressIs=(
            <>
                
                <p>Skonfiguruj proszę swoje domyślne adresy dla rozliczeń i dostaw podczas składania zamówienia. Możesz także dodać inne adresy, co może być użyteczne przy wysyłaniu prezentów lub odbieraniu zamówienia w miejscu pracy.</p>
                <p>Poniżej znajdują się twoje adresy</p>
                <div className="address">
                    <h1>Mój adres</h1>
                    <a>Imię i nazwisko:</a>
                    <a>Nazwa ulicy:</a>
                    <a>Numer domu:</a>
                    <a>Kod pocztowy:</a>
                    <a>Kraj:</a>
                    <a>Numer telefonu:</a>
                    <div className="address__buttons">
                        <button>Uaktualnij</button>
                        <button>Usuń</button>
                    </div>  
                      
                </div>
                <div className="address__addbutton">
                    <button>Dodaj nowy adres</button>   
                </div>
            </>
        )  
        const addressIsNull=(
            <>
                <p>NIestety nie posiadamy jeszcze twojego adresu. Skonfiguruj proszę swoje domyślne adresy poprzez kliknięcie na przycisk znajdujący się poniżej</p>
                <button>Dodaj nowy adres</button>
            </>
        )  
        return (
            <div>
                <h1>Moje Adresy</h1>
                {/* {addressIsNull} */}
                {addressIs}
            </div>
        )
    }
}
export default AddressData