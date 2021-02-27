import React, {useEffect,useState} from 'react';
import axios from 'axios'
import Slider from "react-slick";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
    withCredentials: true
});
const ShopItemVariants = (props) => {
    const [image, setimage] = useState();
    const [object,setobject]= useState();
    useEffect(()=>{
        axios.get(props.item.url)
        .then(res=>{
            if(res.data.images[0]!== undefined){
            setimage(res.data.images[0].original)}
            setobject(res.data)
        })
    },[])
    return (
        
        <div className="shop__items__elements__childrenimg">
            <img onClick={()=>props.handlemain(object)}src={image}/>
        </div>
        
    );
};

export default ShopItemVariants;