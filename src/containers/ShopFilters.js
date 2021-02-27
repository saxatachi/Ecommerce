import React, { Component } from 'react'
import "../css/shop.min.css"
import "../css/shopfilters.min.css"
import {getItems, getBasket,getCategory} from "../store/actions/items";
import {connect} from 'react-redux'
class ShopFilters extends Component {
    state = {
        activeCategory: false
      };
    handleCategory = (e)=>{
        console.log(e.target.textContent)
        this.props.getCategory(e.target.textContent)
    }
    handleChange = () =>{
        this.setState({
            activeCategory : !this.state.activeCategory
        })
    }
    
    render() {
        const none_menu = {
            display: 'none'
        }
        const block_menu={
            display: 'block'
        }
        return (
            <div className="shop">
                    <div className="shop__title">
                        <h1>Produkty naszego sklepu</h1>
                    </div>
                    <div className="shop__bar">
                        <button onClick = {this.handleChange} className="shop__bar__choose">Rodzaj</button>
                            <div className="shop__bar__choose__list" style={this.state.activeCategory ? block_menu : none_menu }>
                                <div className="shop__bar__choose__list-li">
                                    <ul className="filter__options">
                                        <li onClick={this.handleCategory} className="filter__option">buty</li>
                                        <li onClick={this.handleCategory} className="filter__option">bluzki</li>
                                        <li onClick={this.handleCategory} className="filter__option">spodnie</li>
                                        <li onClick={this.handleCategory} className="filter__option">czapki</li>
                                    </ul>
                                </div>
                            </div>
                        
                        {/* <div className="shop__bar__type">Typ
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
                        </div> */}
                        {/* <div className="shop__bar__sort">Sortowanie</div> */}
                            {/* <div className="shop__bar__sort__list" style={none_menu}>
                                <ul className="filter__options">
                                    <li className="filter__option">pierwsza sort</li>
                                    <li className="filter__option">drugi sort</li>
                                    <li className="filter__option">trzeci sort</li>
                                    <li className="filter__option">czwarty sort</li>
                                </ul>
                            </div> */}
                    </div>
                </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      authenticated: state.auth.user !== null,
      userId: state.auth.userId,
      basketlength: state.items.basketlength
    };
  };
  
  const mapDispatchToProps = () =>dispatch => {
    return {
      getItems: () =>dispatch(getItems()),
      getBasket: () =>dispatch(getBasket()),
      getCategory: (x)=>dispatch(getCategory(x))
  
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(ShopFilters)