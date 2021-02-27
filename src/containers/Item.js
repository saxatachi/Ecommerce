import React, { Component } from 'react'
import axios from 'axios'
import "../css/items.min.css"
import Dropdown from 'react-dropdown';
import { useHistory } from 'react-router-dom';
import {connect} from "react-redux";
import ItemVariants from "./ItemVariants"
import Rating from 'react-rating'
import ReactStars from 'react-rating-stars-component'
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import RecommendProducts from './RecommendProducts';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"


const session = axios.create({
	withCredentials: true
});
class Item extends Component {  
    
    componentDidMount(){
        
        window.scrollTo(0, 0);
        const id=this.props.match.params.id
        const it=null
        let all=this.props.allitems.items
        for(let i=0;i<all.length;i++){
            if(all[i].id==id){
                let recommended=all[i].recommended_products
                session.get(all[i].children[0].url)
                    .then(res=>{
                        if(res.data.images[0]!== undefined){

                        this.setState({
                            mainimage: res.data.images[0].original
                        })
                        
                        }else{
                            this.setState({
                                alt: "brak zdjęcia"
                            })
                        }
                    })
                for(let i=0;i<recommended.length;i++){
                    session.get(recommended[i])
                        .then(res=>{
                            this.setState(previousState => ({
                                recommended_products: [...previousState.recommended_products,res.data]
                            }))
                        })
                }
                this.setState({  
                    olditem: all[i],
                    item: all[i].children[0],
                })
                
                
            }
        }
    }
    state={
        object : this.props.location.state.obj,
        active: this.props.location.state.activeid,
        recommended_products: [],
        olditem: null,
        item: null,
        firstDropdown: false,
        secondDropdown: false,
        mainimage: null,
        quantity: 1,
        alt: "",
        item_images: []
        }
    // sizeRef = React.createRef();
    // quantityRef = React.createRef()
    
    handleDropdown = () =>{
        this.setState({
            firstDropdown: !this.state.firstDropdown
        })
    }
    handleDropdownQuantity = () =>{
        this.setState({
            secondDropdown: !this.state.secondDropdown
        })
    }
    handleImage = (item1) =>{
        session.get(item1.url)
            .then(res=>{
               this.setState({
                   mainimage: res.data.images[0].original,
                   item_images: res.data.images
               })

            })
        if(this.state.item !== null){
        this.setState({
            item: item1
        })
        }    
    }
    handleImg = (e) =>{
        this.setState({
            mainimage: e.target.src
        })    
    }
    handleSize = (e ) =>{
        let text = e.target.textContent
        this.sizeRef.current.textContent = text
        this.setState({
            firstDropdown: !this.state.firstDropdown
        })
        
    }
    handleQuantity = (e) =>{
        let text = e.target.textContent
        this.quantityRef.current.textContent = text
        this.setState({
            quantity: e.target.textContent,
            secondDropdown: !this.state.secondDropdown
        })
    }
    handleBuy = () => {
        let data ={
            "url": this.state.item.url,
            "quantity": this.state.quantity
        }
        session.post('http://127.0.0.1:8000/api/basket/add-product/',data)
        
        
    }
    handleObject = (item) =>{
        
        this.setState({
            object : item
        })
    }
    render() {
        return (
            
            <div className="itemcontainer">
                {this.state.item !== null && 
                <>
                <div className="itemcontainer__breadcrumb">
                    {/* <h1>{this.state.olditem.categories[0]}</h1> */}
                    
                </div>
                <div className="itemcontainer__image">
                    <div className="itemcontainer__image__allimages">
                        {/* {this.state.item_images.map((item,key)=><div onClick={this.handleImg} className="itemcontainer__image__allimages-image" ><img src={item.original} alt="obrazek"/></div>)} */}
                    </div>
                    {/* <img src={this.state.object.images[0].original}></img> */}
                    
                    <div className="itemcontainer__recommendproducts">
                    <div className="itemcontainer__recommendproducts__title">
                        <h1>SKOMPLETUJ SWÓJ LOOK</h1>
                    </div>
                    <div className="itemcontainer__recommendproducts__cards">
                        {/* {this.state.recommended_products.map((item,key)=><RecommendProducts item={item}/>)} */}
                    </div>
                    </div>
                </div>
                
                <div className="itemcontainer__orderinformation">
                    <div className="itemcontainer__orderinformation__review">
                        Średnia ocen produktu
                        <ReactStars count={5} edit={false} size={24} value={4.75}color2={'#ffd700'} />
                    </div>
                    
                    <div className="itemcontainer__orderinformation__category">
                        {/* {this.state.item.categories[0]} */}
                    </div>
                    <div className="itemcontainer__orderinformation__name">
                        {this.state.object.title}
                    </div>
                    <div className="itemcontainer__orderinformation__price">
                        {this.state.object.price.incl_tax} zł
                        
                    </div>
                    <div className="itemcontainer__orderinformation__default">
                        <div className="itemcontainer__orderinformation__default-first">
                            -25% na nowości
                        </div>
                        <h3>Kup najgorętsze hity ze ZNIŻKĄ 25%. Dowiedz się więcej</h3>
                    </div>
                    
                    <div className="itemcontainer__orderinformation__variants">
                    <h3>Dostępne warianty</h3>
                        <div className="itemcontainer__orderinformation__variants__images">
                            {/* {this.state.olditem.children.map((items)=><ItemVariants url={this.state.object.url} setimage={this.handleImage} item={items} handleObject={this.handleObject}/>)} */}
                        </div>
                    </div>
                    <div className="itemcontainer__orderinformation__buttons">
                        
                        <div className="itemcontainer__orderinformation__buttons__size">
                            <button ref={this.sizeRef} onClick={this.handleDropdown}><span>Wybierz rozmiar</span></button>
                            <div className="itemcontainer__orderinformation__buttons__size__dropdown" style={{display: this.state.firstDropdown ? 'block' : 'none' }}>
                                <div className="itemcontainer__orderinformation__buttons__size__list" >
                                <ul className="sizelist">
                                    <li onClick={this.handleSize}>39</li>
                                    <li onClick={this.handleSize}>40</li>
                                    <li onClick={this.handleSize}>41</li>
                                    <li onClick={this.handleSize}>42</li>
                                    <li onClick={this.handleSize}>43</li>
                                    <li onClick={this.handleSize}>44</li>
                                </ul>   
                                 
                                </div>
                            </div>
                        </div>
                        <div className="itemcontainer__orderinformation__buttons__quantity">
                            <button ref={this.quantityRef} onClick={this.handleDropdownQuantity}><span>Ilość</span></button>
                            <div className="itemcontainer__orderinformation__buttons__size__dropdown" style={{display: this.state.secondDropdown ? 'block' : 'none' }}>
                            <div className="itemcontainer__orderinformation__buttons__quantity__list" >
                                <ul className="quantitylist">
                                    <li onClick={this.handleQuantity}>1</li>
                                    <li onClick={this.handleQuantity}>2</li>
                                    <li onClick={this.handleQuantity}>3</li>
                                    <li onClick={this.handleQuantity}>4</li>
                                    <li onClick={this.handleQuantity}>5</li>
                                    <li onClick={this.handleQuantity}>6</li>
                                    <li onClick={this.handleQuantity}>7</li>
                                    <li onClick={this.handleQuantity}>8</li>
                                    <li onClick={this.handleQuantity}>9</li>
                                    <li onClick={this.handleQuantity}>10</li>
                                </ul>   
                                </div>
                            </div>
                            </div>
                        <div className="itemcontainer__orderinformation__buttons__add">
                            <button onClick={this.handleBuy}><span>Dodaj do Koszyka</span></button>
                        </div>
                    </div>
                    <div className="itemcontainer__orderinformation__default">
                        <a>Darmowa dostawa</a>
                    </div>
                    <div className="itemcontainer__orderinformation__default">
                        <a>Nie będzie cię w domu? Skorzystaj z usługi przekierowania paczki UPS</a>
                    </div>
                    <div className="itemcontainer__orderinformation__default">
                        <a>Darmowa wymiana - właściwy rozmiar za każdym razem</a>
                    </div>
                </div>
                
                </>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    allitems : state.items.allitems,
    isLoaded : state.items.isAllLoadedItems
    };
  };
export default connect(mapStateToProps)(Item);