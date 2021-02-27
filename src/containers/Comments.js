import React from 'react';
import StarRatings from 'react-star-ratings';
import ReactStars from 'react-rating-stars-component';
const Comments = (props) => {
    console.log(props.item)
    return (
        
        <div className="itemcontainer__comments-comms">
            <div className="itemcontainer__comments-comms__image">
                <img src="http://127.0.0.1:8000/static/default.jpg/"/>
            </div>
            <div className="itemcontainer__comments-comms__container">
                <div className="itemcontainer__comments-comms__top">
                    <div className="itemcontainer__comments-comms__top-title">
                        {props.item.title}
                    </div>
                    <div className="itemcontainer__comments-comms__top-stars">
                        {/* <ReactStars count={5} edit={false} size={30} a11y={true} value={props.item.score} color2={'#ffd700'} /> */}
                        <StarRatings
          rating={props.item.score}
          starRatedColor='#ffd700'
          starDimension='30px'
          starSpacing='3px'
          numberOfStars={5}
          name='rating'
        />
                    </div>
                </div>
                <div className="itemcontainer__comments-comms__body">
                    {props.item.body}
                </div>
            </div>
        </div>
       
    );
};

export default Comments;