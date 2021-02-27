import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios'
import "../css/items.min.css"
import { Link, withRouter } from "react-router-dom";
import Dropdown from 'react-dropdown';
import { useHistory } from 'react-router-dom';
import {connect} from "react-redux";
import ItemVariants from "./ItemVariants"
import {getItems, getBasket} from "../store/actions/items";
import Rating from 'react-rating'
import ReactStars from 'react-rating-stars-component'
import RecommendProducts from './RecommendProducts';
import Delivery from './Mod';
import Comments from './Comments';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
    withCredentials: true
});
const Item1 = (props) => {
    let history= useHistory()
    const [object, setobject] = useState();
    const [parent, setparent] = useState();
    const [image,setimage] = useState();
    const [recommend, setrecommend] = useState();
    const [firstDropdown,setfirstDropdown] = useState(false);
    const [secondDropdown,setsecondDropdown] = useState(false);
    const [modal,setmodal] = useState(false);
    const [quantity,setquantity] = useState(1)
    const [score,setscore]= useState(null)
    const [value,setvalue]= useState(0)
    const refsize = useRef(null);
    const refquantity = useRef(null);
    
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        let url = "http://127.0.0.1:8000/api/products/"
        let str = history.location.pathname.split("/") 
        let len = str.length-1
        let id = str[len]
        let req = url + id + "/"
        let result = props.allitems.items.find(item=> item.url === `${req}`)
        if(result.structure !== "parent"){
        setobject(result)
        setimage(result.images[0].original)
        console.log(result)
        let arr = 0;
        for(let i=0;i<result.reviews.length;i++){
            console.log(result.reviews[i])
            arr += result.reviews[i].score
        }
        setscore(arr/result.reviews.length)
        let req1 = url + result.parent + "/"
        let result1 = props.allitems.items.find(item=> item.url === `${req1}`)
        let all = props.allitems.items
        setparent(result1)
        handleRecommend(result,result1,all)
        }else{
            history.push({
                pathname: `/item/${result.children[0].id}`,
            })
        }
        
    },[])
    
    useEffect(()=>{
        
        let url = "http://127.0.0.1:8000/api/products/"
        let str = history.location.pathname.split("/") 
        let len = str.length-1
        let id = str[len]
        let req = url + id + "/"
        let result = props.allitems.items.find(item=> item.url === `${req}`)
        if(result.structure !== "parent"){
        setobject(result)
        setimage(result.images[0].original)
        let arr = 0;
        for(let i=0;i<result.reviews.length;i++){
            console.log(result.reviews[i])
            arr += result.reviews[i].score
        }
        setscore(arr/result.reviews.length)
        let req1 = url + result.parent + "/"
        let result1 = props.allitems.items.find(item=> item.url === `${req1}`)
        setparent(result1)
        }else{
            history.push({
                pathname: `/item/${result.children[0].id}`,
            })
        }
    },[history.location.pathname])
    const handleImage =(e)=>{
        setimage(e.target.src)
    }

    const handleRecommend = (object,parent,all)=>{
        let arr = []
        if(object.recommended_products.length>0){
            setrecommend(object.recommended_products)
        }else if(parent !== undefined && parent.recommended_products.length> 0){
            setrecommend(parent.recommended_products)
        }
        else{
            
            for(let i=0;i<props.default.length;i++){
                let result = all.find(item => item.id === props.default[i].product )
                arr.push(result)
        }
            setrecommend(arr)
        }
    }
    const handleQuantity = (e) => {
        let text = e.target.textContent
        refquantity.current.textContent = text   
        setquantity(e.target.textContent) 
        setsecondDropdown(false)
    }
    const handleSize= (e)=>{
        let text = e.target.textContent
        refsize.current.textContent = text
        setfirstDropdown(false)
    }
    const handlePush =(id,object)=>{
        history.push({
            pathname: `/item/${id}`,
            state: {obj: object}
        })
        setobject(object)
        setimage(object.images[0].original)
    }
    const handleDropdown = () =>{
        setfirstDropdown(!firstDropdown)
    }
    const handleDropdownQuantity = ()=>{
        setsecondDropdown(!secondDropdown)
    }
    const handleBuy = async() => {
        let data ={
            "url": object.url,
            "quantity": quantity
        }
        await session.post('http://127.0.0.1:8000/api/basket/add-product/',data)
        await props.getBasket()
    }
    const handleModal = (number) =>{
        console.log(number)
        setmodal(true)
        setvalue(number)
    }
    
    // console.log(object.reviews)
     
    let comments 
    if(object !== undefined){
        comments = object.reviews.map((item)=> <Comments item={item}/>)} 
    
    return (
        <>
        <div className="itemcontainer">
                {modal && <Delivery setmodal={setmodal} value={value}/>}
                <>

                <div className="itemcontainer__breadcrumb">
                    {/* <h1>{this.state.olditem.categories[0]}</h1> */}
                    
                </div>
                
                <div className="itemcontainer__image">
                    <div className="itemcontainer__image__allimages">
                        {/* {this.state.item_images.map((item,key)=><div onClick={this.handleImg} className="itemcontainer__image__allimages-image" ><img src={item.original} alt="obrazek"/></div>)} */}
                        {object !== undefined && object.images.map((item,key)=><div onClick={handleImage} className="itemcontainer__image__allimages-image" ><img src={item.original} alt="obrazek"/></div>)}
                    </div>
                    {/* <img src={this.state.object.images[0].original}></img> */}
                    {/* {object !== undefined && <img src={object.images[0].original} />} */}
                    {object !== undefined && <img src={image} />}
                    <div className="itemcontainer__recommendproducts">
                    <div className="itemcontainer__recommendproducts__title">
                        <h1>SKOMPLETUJ SWÓJ LOOK</h1>
                    </div>
                    <div className="itemcontainer__recommendproducts__cards">
                        {/* {this.state.recommended_products.map((item,key)=><RecommendProducts item={item}/>)} */}
                        {recommend !== undefined && recommend.map((item,key)=><RecommendProducts item={item}/>) }
                    </div>
                    </div>
                </div>
                
                <div className="itemcontainer__orderinformation">
                    <div className="itemcontainer__orderinformation__review">
                        Średnia ocen produktu
                        <ReactStars count={5} edit={false} size={24} value={score}color2={'#ffd700'} />
                    </div>
                    
                    <div className="itemcontainer__orderinformation__category">
                        {/* {this.state.item.categories[0]} */}
                    </div>
                    <div className="itemcontainer__orderinformation__name">
                        
                        {object !== undefined && object.title}
                        
                        
                    </div>
                    <div className="itemcontainer__orderinformation__price">
                        {object !== undefined && object.price.incl_tax} zł
                        
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
                            {parent !== undefined && parent.children.map((items)=><ItemVariants url={object.url} handlePush={handlePush} item={items} />)}
                        </div>
                    </div>
                    <div className="itemcontainer__orderinformation__buttons">
                        
                        <div className="itemcontainer__orderinformation__buttons__size">
                        <button ref={refsize} onClick={handleDropdown} ><span>Wybierz rozmiar</span></button>
                            {/* <button ref={this.sizeRef} onClick={this.handleDropdown}><span>Wybierz rozmiar</span></button> */}
                            {/* <div className="itemcontainer__orderinformation__buttons__size__dropdown" style={{display: this.state.firstDropdown ? 'block' : 'none' }}> */}
                            <div className="itemcontainer__orderinformation__buttons__size__dropdown" style={{display: firstDropdown ? 'block' : 'none' }}>
                                <div className="itemcontainer__orderinformation__buttons__size__list" >
                                <ul className="sizelist">
                                    <li onClick={handleSize}>39</li>
                                    <li onClick={handleSize}>40</li>
                                    <li onClick={handleSize}>41</li>
                                    <li onClick={handleSize}>42</li>
                                    <li onClick={handleSize}>43</li>
                                    <li onClick={handleSize}>44</li>
                                </ul>   
                                 
                                </div>
                            </div>
                        </div>
                        <div className="itemcontainer__orderinformation__buttons__quantity">
                            {/* <button ref={this.quantityRef} onClick={this.handleDropdownQuantity}><span>Ilość</span></button> */}
                            <button ref={refquantity} onClick={handleDropdownQuantity}><span>Ilość</span></button>
                            {/* <div className="itemcontainer__orderinformation__buttons__size__dropdown" style={{display: this.state.secondDropdown ? 'block' : 'none' }}> */}
                            <div className="itemcontainer__orderinformation__buttons__size__dropdown" style={{display: secondDropdown ? 'block' : 'none' }}>
                            <div className="itemcontainer__orderinformation__buttons__quantity__list" >
                                <ul className="quantitylist">
                                    <li onClick={handleQuantity}>1</li>
                                    <li onClick={handleQuantity}>2</li>
                                    <li onClick={handleQuantity}>3</li>
                                    <li onClick={handleQuantity}>4</li>
                                    <li onClick={handleQuantity}>5</li>
                                    <li onClick={handleQuantity}>6</li>
                                    <li onClick={handleQuantity}>7</li>
                                    <li onClick={handleQuantity}>8</li>
                                    <li onClick={handleQuantity}>9</li>
                                    <li onClick={handleQuantity}>10</li>
                                </ul>   
                                </div>
                            </div>
                            </div>
                        <div className="itemcontainer__orderinformation__buttons__add">
                            <button onClick={handleBuy}><span>Dodaj do Koszyka</span></button>
                        </div>
                    </div>
                    <div onClick={()=>handleModal(1)} className="itemcontainer__orderinformation__default">
                        <a>Darmowa dostawa</a>
                    </div>
                    <div onClick={()=>handleModal(2)} className="itemcontainer__orderinformation__default">
                        <a>Nie będzie cię w domu? Skorzystaj z usługi przekierowania paczki UPS</a>
                    </div>
                    <div onClick={()=>handleModal(3)} className="itemcontainer__orderinformation__default">
                        <a>Darmowa wymiana - właściwy rozmiar za każdym razem</a>
                    </div>
                </div>
                </>
                
                <div className="itemcontainer__comments">
                    <div className="itemcontainer__comments-title">Komentarze
                    
                    </div>
                    {comments}
                    {/* <div className="itemcontainer__comments-comms">
                        <div className="itemcontainer__comments-comms__image">
                            <img src="http://127.0.0.1:8000/static/default.jpg/"/>
                        </div>
                    </div> */}
                </div> 
            </div>
            </>
    );
};
const mapStateToProps = state => {
    return {
   
    allitems : state.items.allitems,
    selecteditems : state.items.selecteditems.items,
    default : state.items.default
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getBasket: () =>dispatch(getBasket())
  
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Item1); 
