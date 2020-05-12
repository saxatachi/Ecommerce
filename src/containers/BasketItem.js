import React ,{ useState, useEffect } from 'react';
import axios from "axios"
import PropTypes from 'prop-types'
const BasketItem = props => {
    console.log(props.items)
    return (
        <>
            <tr>
                <th className="product"><i class="fa fa-times-circle fa-2x" aria-hidden="true"></i><img src="http://127.0.0.1:8000/static/fashion.jpg/"></img><span className="product">Tytuł produktu</span></th>
                <th className="price"><span className="price">50.99 </span></th>
                <th className="quantity"><span className="quantity"><i class="fa fa-minus" aria-hidden="true"></i>1<i class="fa fa-plus" aria-hidden="true"></i></span></th>
                <th className="summary"><span className="summary">50.99</span></th>
                        
            </tr>
        </>
    );
};


export default BasketItem;