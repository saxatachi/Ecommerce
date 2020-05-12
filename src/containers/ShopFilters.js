import React, { Component } from 'react'
import "../css/shop.min.css"
class ShopFilters extends Component {
    render() {
        const none_menu = {
            display: 'none'
        }
        const block_menu={
            display: 'block'
        }
        // const {firstdropdownmenu,typedropdownmenu,pricedropdownmenu,sortdropdownmenu}=this.state
        return (
            <div className="shop">
                    <div className="shop__title">
                        <h1>Produkty naszego sklepu</h1>
                    </div>
                    <div className="shop__bar">
                        <div className="shop__bar__choose">Rodzaj
                            <div className="shop__bar__choose__list" style={none_menu}>
                                <ul className="filter__options">
                                    <li className="filter__option">pierwsza rodzaj</li>
                                    <li className="filter__option">drugi rodzaj</li>
                                    <li className="filter__option">trzeci rodzaj</li>
                                    <li className="filter__option">czwarty rodzaj</li>
                                </ul>
                            </div>
                        </div>
                        <div className="shop__bar__type">Typ
                            <div className="shop__bar__type__list" style={none_menu}>
                                <ul className="filter__options">
                                    <li className="filter__option">pierwsza typ</li>
                                    <li className="filter__option">drugi typ</li>
                                    <li className="filter__option">trzeci typ</li>
                                    <li className="filter__option">czwarty typ</li>
                                </ul>
                            </div>
                        </div>
                        <div className="shop__bar__price">Cena
                            <div className="shop__bar__price__list" style={none_menu}>
                                <ul className="filter__options">
                                    <li className="filter__option">pierwsza cena</li>
                                    <li className="filter__option">drugi cena</li>
                                    <li className="filter__option">trzeci cena</li>
                                    <li className="filter__option">czwarty cena</li>
                                </ul>
                            </div>
                        </div>
                        <div className="shop__bar__sort">Sortowanie</div>
                            <div className="shop__bar__sort__list" style={none_menu}>
                                <ul className="filter__options">
                                    <li className="filter__option">pierwsza sort</li>
                                    <li className="filter__option">drugi sort</li>
                                    <li className="filter__option">trzeci sort</li>
                                    <li className="filter__option">czwarty sort</li>
                                </ul>
                            </div>
                    </div>
                </div>
        )
    }
}
export default ShopFilters