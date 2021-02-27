import React, { Component } from 'react'
import "../css/shop.min.css"
import Bar from "./Bar"
import ShopFilters from "./ShopFilters"
import ShopItems from "./ShopItems"
import {connect} from 'react-redux'
import { getCategory } from '../store/actions/items'
class Shop extends Component {
    state={
        firstdropdownmenu: false,
        typedropdownmenu: false,
        pricedropdownmenu: false,
        sortdropdownmenu: false
    }
    render() {

        return (
            
            
            <div className="shop-page">
                <Bar />
                <ShopFilters />
                <ShopItems />
                
            </div>
            
        )
    }
}

export default Shop;
