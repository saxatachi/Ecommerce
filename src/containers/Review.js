import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Modal from './Modals'
import "../css/review.min.css"
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});

const Review = () => {
    const [refresh,setrefresh] = useState(false)
    const [array,setarray] = useState([])  
    const [fullarray,setfullarray] = useState([])
    const [modal,setmodal]= useState(false)
    const [product,setproduct] = useState(null)
    useEffect(() => {
        session.get("http://127.0.0.1:8000/api/orders/")
    .then(res=>{
        for(let i=0; i<res.data.length;i++){
            session.get(res.data[i].lines)
            .then(res=>{
                for(let j=0;j<res.data.length;j++){
                    console.log(res.data[j])
                    console.log(res.data[j].product)
                    setarray(oldarray => [...oldarray,res.data[j].product])
                    setfullarray(oldarray => [...oldarray,res.data[j]])
                }
                
            })
        }
    })
    }, [])
    let set = new Set(array)
    let arr = Array.from(set)
    let items = arr.map((item)=> <ReviewItems  setproduct={setproduct} setmodal={setmodal} item={item} fullarray={fullarray}/>) 
    return (
        <div className="review">
            {modal &&<Modal setrefresh={setrefresh} product={product} setmodal={setmodal}/>}
            <div className="review__items-title">
                <h1>Recenzje zakupionych produktów</h1>
            </div>
            <div className="review__items-container">
                {items.length>0 ?items:<p>Musisz zakupić produkt w sklepie aby go ocenić.</p>}
            </div>
        </div>
    );
};

export default Review;

const ReviewItems = (props) => {
    
    const handleClick = (item) =>{
        props.setproduct(item)
        props.setmodal(true)
    }
    
    const [item,setitem] = useState([])  
    const [image,setimage] = useState(null)
    const [added,setadded] = useState(false)
    useEffect(()=>{
        session.get(props.item)
        .then(res=>{
            console.log(res.data)
            if(res.data.reviews.length>0){
                console.log("jest wieksze")
                console.log(res.data.reviews)
                console.log(res.data.reviews.length)
                let x = res.data.reviews.find(element=>element.user === "http://127.0.0.1:8000/api/users/4/")
                console.log(x)
                if(x !== undefined){
                    setadded(true)
                }
                
                // for(let i=0;res.data.reviews.length;i++){
                //     console.log(res.data.reviews[i])
                //     // if(res.data.reviews[i].user == "http://127.0.0.1:8000/api/users/4/"){
                //     //     console.log("jest")
                //     //     setadded(true)
                        
                //     // }
                // }

            }
            setitem(res.data)
            setimage(res.data.images[0].original)
        })
    },[])
    
    return (
        <div className="review__items__item">

            <img className="review__items__item-image"src={image} />
            <div className="review__items__item__container">
                <div className="review__items__item__container-title">
                    {item.title}
                </div>
            </div>
            <div className="review__items__item__button">
                {added ? <button className="review__items__item__button-btn1">Recenzja została przez ciebie dodana</button>: <button onClick={()=>handleClick(item)} className="review__items__item__button-btn">Napisz recenzję</button>}
            </div>
        </div>
    );
};

