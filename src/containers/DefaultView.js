import React, { Component } from 'react'
import "../css/defaultview.min.css"
export default class DefaultView extends Component {
    render() {
        return (
            
            <div className="defaultview">
                <div className="defaultview__title">
                    <h1>Witaj Michał</h1>
                </div>
                <div className="defaultview__lastbought">
                    Moje ostatnie zakupy
                </div>
                <div className="defaultview__discountpoints">
                    Punkty rabatowe
                </div>
                <div className="defaultview__rate">
                    Oceń
                </div>
                <div className="defaultview__new">
                    Nowe
                </div>
                <div className="defaultview__discount">
                    Promocja
                </div>
                <div className="defaultview__chosen">
                    Wybrane dla ciebie
                </div>


            </div>
        
        )
    }
}
