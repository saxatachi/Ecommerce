import React, { Component } from 'react'
import "../css/items.min.css"
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import {connect} from "react-redux"

class Item extends Component {
    componentDidMount(){
        
        const id=this.props.match.params.id
        const it=null
        let all=this.props.allitems.items
        for(let i=0;i<all.length;i++){
            if(all[i].id==id){
                console.log(all[i].images[0].original)
                this.setState({
                    
                    item: all[i],
                    mainimage: all[i].images[0].original
                })
            }
        }
    }
    state={
        
        item: null,
        firstDropdown: false,
        secondDropdown: false,
        mainimage: null,
    }
    sizeRef = React.createRef();
    quantityRef = React.createRef()
    
    handleDropdown = () =>{
        console.log("wybierz rozmiar")
        this.setState({
            firstDropdown: !this.state.firstDropdown
        })
    }
    handleDropdownQuantity = () =>{
        this.setState({
            secondDropdown: !this.state.secondDropdown
        })
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
            secondDropdown: !this.state.secondDropdown
        })
    }
    
    
    render() {
        return (
            
            <div className="itemcontainer">
                {this.state.item !== null && 
                <>
                <div className="itemcontainer__breadcrumb">
                    <h1>{this.state.item.categories[0]}</h1>
                </div>
                
                <div className="itemcontainer__image">
                    <div className="itemcontainer__image__allimages">
                        {this.state.item.images.map((item)=><div onClick={this.handleImg} className="itemcontainer__image__allimages-image" ><img src={item.original} alt="obrazek"/>
                        <br /></div>)}
                    </div>
                    <img src={this.state.mainimage}></img>
                    
                    <div className="itemcontainer__recommendproducts">
                    <div className="itemcontainer__recommendproducts__title">
                        <h1>SKOMPLETUJ SWÓJ LOOK</h1>
                    </div>
                
                
                    <div className="itemcontainer__recommendproducts__cards">
                        
                        <div className="itemcontainer__recommendproducts__card">
                            <img src="http://127.0.0.1:8000/media/images/products/2020/04/image_not_found.jpg.jpg" alt="obrazek"/>
                            Cena : 100zł
                        </div>
                        <div className="itemcontainer__recommendproducts__card">
                            <img src="http://127.0.0.1:8000/media/images/products/2020/04/image_not_found.jpg.jpg" alt="obrazek"/>
                            Cena : 100zł
                        </div>
                        <div className="itemcontainer__recommendproducts__card">
                            <img src="http://127.0.0.1:8000/media/images/products/2020/04/image_not_found.jpg.jpg" alt="obrazek"/>
                            Cena : 100zł
                        </div>
                        <div className="itemcontainer__recommendproducts__card">
                            <img src="http://127.0.0.1:8000/media/images/products/2020/04/image_not_found.jpg.jpg" alt="obrazek"/>
                            Cena : 100zł
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="itemcontainer__orderinformation">
                    <div className="itemcontainer__orderinformation__review">
                        Recenzja
                    </div>
                    
                    <div className="itemcontainer__orderinformation__category">
                        {this.state.item.categories[0]}
                    </div>
                    <div className="itemcontainer__orderinformation__name">
                        {this.state.item.title}
                    </div>
                    <div className="itemcontainer__orderinformation__price">
                        {this.state.item.children[0].price.incl_tax} {this.state.item.children[0].price.currency}
                    </div>
                    <div className="itemcontainer__orderinformation__default">
                        <div className="itemcontainer__orderinformation__default-first">
                            -25% na nowości
                        </div>
                        <h3>Kup najgorętsze hity ze ZNIŻKĄ 25%. Dowiedz się więcej</h3>
                    </div>
                    <div className="itemcontainer__orderinformation__variants">
                        <h3>Dostępne warianty</h3>
                        {this.state.item.children.map((img)=> console.log(img))}
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
                            <button><span>Dodaj do Koszyka</span></button>
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
    //   array: state.items.mainarray.items
    allitems : state.items.allitems,
    isLoaded : state.items.isAllLoadedItems
    };
  };
export default connect(mapStateToProps)(Item);