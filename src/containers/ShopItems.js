import React, { Component } from 'react';
import "../css/shopitems.min.css"
import {connect} from 'react-redux'
class ShopItems extends Component {
    
    
    render() {
        console.log(this.props.allitems)
        const array= this.props.allitems
        console.log("tablica")
        console.log(array.items)
        const ListItems=array.items.map((item)=>
        <div className="shop__items__elements">

                <div className="shop__items__elements__img">
                    <img src={item.images[0].original}/>
                </div>
                {item.categories}<br/>
                {item.title}<br/>
                {item.price}
                
            
        </div>
        )
        return (
            
            <div className="shop__items">
                <div className="shop__items__title">
                    <h1>Tu bedą itemy</h1>
                </div>
                
                    {ListItems}
            </div>
            
            
        );
    }
}
const mapStateToProps = state => {
    return {
    //   array: state.items.mainarray.items
    allitems : state.items.allitems,
    };
  };
export default connect(mapStateToProps)(ShopItems);
// export default ShopItems;