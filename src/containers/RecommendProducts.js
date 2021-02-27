import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const RecommendProducts = props => {
    useEffect(()=>{
        console.log(props.item)
        let result = props.allitems.items.find(item=> item.id === props.item.id)
        if(result == undefined){
            result = props.allitems.items.find(item=> item.url === props.item)
        }
        setResult(result)
    //     if(result.structure === 'parent'){
    //     let result1 = props.allitems.items.find((item)=> item.id === result.children[0].)
    //     setResult(result1)
    // }
    },[])
    function handleClick(item){
        console.log(item)
        let split = item.url.split("/")
        console.log(split)
        var id = split[split.length-2];
        console.log(id)
        history.push({
            pathname: `/item/${id}`,
        })
        
    }
    let history= useHistory()
    const [res,setResult]= useState()
    const [price,setPrice] = useState()
    return (
        <div onClick={()=>handleClick(res)}className="itemcontainer__recommendproducts__card">
            <img src={res !== undefined && res.images[0].original} alt="obrazek"/>
            <div className="itemcontainer__recommendproducts__card__title">
                {res !== undefined &&  res.title}
            </div>
            Cena : {res !== undefined && res.price.incl_tax} zł
        </div>
    );
};
const mapStateToProps = state => {
    return {
   
    allitems : state.items.allitems,
    selecteditems : state.items.selecteditems.items
    }
}
export default connect(mapStateToProps)(RecommendProducts); 
