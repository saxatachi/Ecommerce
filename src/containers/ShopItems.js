import React, { Component } from 'react';
import "../css/shopitems.min.css"
import {connect} from 'react-redux'
import ShopItem from './ShopItem'
import Slider from "react-slick";


class ShopItems extends Component {
    render() {
        this.state = {
            categories : false,
            allitems : true,
            array: []
        }
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
        let CategoryItems
        if(this.props.category.length> 0 ){
            CategoryItems = this.props.category.map((item)=><ShopItem items={item}/>)
        }
        const ListItems= this.props.selecteditems.map((item)=><ShopItem items={item}/>)
        return (
            <div className="shop__items">
                {this.props.category.length> 0  ? CategoryItems : ListItems}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
    //   array: state.items.mainarray.items
    allitems : state.items.allitems,
    selecteditems : state.items.selecteditems.items,
    category: state.items.category
    };
  };
export default connect(mapStateToProps)(ShopItems);
// export default ShopItems;