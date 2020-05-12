import React from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "../css/homepageitem.min.css"
import Item from './Item'
function HomePageItem(props) {
  const history = useHistory();
  
  console.log("to są te propsy")
  console.log(props)
  function handleClick() { 
    console.log(history)
    history.push(`/item/${props.items.id}`)
    
    console.log(props)
    alert("działa")  
    
  }
  return (
    
    <div className="product" onClick={handleClick}>
        
        <img className="product__img" src={props.items.images[0].original}></img>
        <div className="product-card">
          <div className="product-card__category">
            <span >{props.items.categories[0]}</span>
          </div>
          <div className="product-card__details-main">
            <div className="product-card__details-main__title">{props.items.title}</div>
            <div className="product-card__details-main__price">{props.items.children[0].price.incl_tax}</div>
          </div>
        </div>
        {/* <h1>{props.items.description}</h1> */}
    </div>
  )
}
export default HomePageItem;