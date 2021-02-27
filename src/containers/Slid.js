import React from 'react';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "../css/shopitems.min.css"
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-elastic-carousel'

const Slid = (props) => {
    console.log(props)
    console.log(props.items)
    console.log(props.images)
    console.log(props.object)
    let items= props.object.map((item,key)=><div><img className="slider__img" onClick={()=>props.handlemain(item)} src={item.images[0].original}/></div>)
    const settings = {
        
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        speed: 500,
        rows: 1,
        slidesPerRow: 3
      };
    return (
        <div className="slid">
            <Carousel itemsToShow={3} showArrows={props.object.length> 3 ?true: false } showDots={false}>
                {items}
            </Carousel>
            
        </div>
    );
};

export default Slid;