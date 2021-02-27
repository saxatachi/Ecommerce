import React,{useEffect,useState} from 'react';
import axios from 'axios';
import "../css/shopitem.min.css"
import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import ShopItemVariants from './ShopItemVariants';
import Slid from './Slid';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
const ShopItem = (props) => {
    const[images,setimages]=useState([])
    const[object,setobject] = useState([])
    useEffect(()=>{

        if(props.items.children.length>0){
        for(let i=0;i<props.items.children.length;i++){
            // console.log(props.items.children[i])
            session.get(props.items.children[i].url)
            .then(res=>{
                console.log(res.data.images[0].original)
                console.log(res.data)
                setimages(oldArray => [...oldArray,res.data.images[0].original]);
                setobject(oldArray => [...oldArray,res.data]);
                
            })

        }
    }
    },[])
    useEffect(()=>{
        if(props.items.structure === "parent"){
            let result = props.allitems.items.find(item=> item.url === `${props.items.children[0].url}`)
            setmainobject(result)
            setprice(props.items.children[0].price.incl_tax)
        }else{
            setprice(props.items.price.incl_tax)
        }
        if(mainobject.structure === "parent"){
        session.get(mainobject.children[0].url)
            .then(res=>{
                setmainobject(res.data)
                setid(res.data.id)
                
            })
        }
        
        
        
    },[props])
    const act = props.items.id
    const settings = {
        slidesToShow: 1,
        speed: 500,
        rows: 1,
        slidesPerRow: 2
      };
    const proba = "hahahah"
    
    const [price, setprice] = useState();
    const [mainobject,setmainobject] = useState(props.items);
    const [id,setid]= useState(props.items.id);
    const [show,setshow]=useState(false)
    const history = useHistory();
    function handleClick() { 
        history.push({
            pathname: `/item/${id}`,
            state: {activeid: act,obj: mainobject}
        }) 
      }
    
    const handleMain = (item)=>{
        setid(item.id)
        setmainobject(item)
    }
    {props.items.children.length > 0 && props.items.children.map((item,key)=><ShopItemVariants item={item} key={key} handlemain={handleMain} />)}
    let items 
    if(props.items.children.length > 0){
        items = props.items.children.map((item,key)=><ShopItemVariants item={item} key={key} handlemain={handleMain} />)
    }
    console.log(props.items)
    console.log(mainobject)
    return (
        <div className="shop__items__elements"  onMouseEnter={() => setshow(true)} onMouseLeave={() => setshow(false)}>
            <div onClick={handleClick}className="shop__items__elements__img">
                {mainobject.structure === "parent"?<img className="image" src={mainobject.images[0].original} /> :<img className="image" src={mainobject.images[0].original} />}
                <div className="middle">
                    <div className="text">Sprawdź</div>
                </div>
            </div>
            <div className="shop__items__elements__children" style={{display:images.length>0 & show ? 'block' : 'none' }}>
                    {images.length > 0 && <Slid handlemain={handleMain} object={object} images={images} items={items}/>}
                    {/* {props.items.children.length > 0 && props.items.children.map((item,key)=><ShopItemVariants item={item} key={key} handlemain={handleMain} />)} */}

            </div>
            <div className="shop__item">
                
                <div className="shop__item__title">{props.items.title}<br /></div>
                <div className="shop__item__price">{price} zł</div>
            </div>
            {props.items.children.length > 0 &&<div className="shop__items__elements__circle">Mnóstwo modeli</div>}
            

           
        </div>
    );
};
const mapStateToProps = state => {
    return {
   
    allitems : state.items.allitems,
    selecteditems : state.items.selecteditems.items
    }
}
export default connect(mapStateToProps)(ShopItem); 