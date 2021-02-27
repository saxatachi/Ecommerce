import React,{useEffect,useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "../css/homepageitem.min.css"
import Item from './Item'
function HomePageItem(props) {
  const [object, setobject] = useState();
  const history = useHistory();
  function handleClick() { 
    history.push(`/item/${props.items.product}`)
    }
  useEffect(() => {
    window.scrollTo(0, 0);
    let url = "http://127.0.0.1:8000/api/products/" + props.items.product + "/"
    let result = props.allitems.find(item=> item.url === `${url}`)
    setobject(result)
  }, [])
  
  return (
    
    <div className="product" onClick={handleClick}>
        
        <img className="product__img" src={object !== undefined &&object.images[0].original}></img>
        <div className="product-card">
          <div className="product-card__category">
            {/* <span >{object.categories[0]}</span> */}
          </div>
          <div className="product-card__details-main">
            <div className="product-card__details-main__title">{object !== undefined && object.title}</div>
            <div className="product-card__details-main__price">{object !== undefined && object.price.incl_tax}</div>
          </div>
        </div>
    </div>
  )
}
export default HomePageItem;