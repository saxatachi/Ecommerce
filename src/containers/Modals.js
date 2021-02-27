import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import "../css/review.min.css";
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
const Modal = (props) => {
    console.log(props.product)
    const [user,setuser]= useState(null)
    const [ratings, setRatings] = useState('');
    const [ratedstars, setRatedstars] = useState(0);
    const [error, seterror] = useState(false);
    const inputref = useRef(null);
    const textarearef = useRef(null);
    const ratingChanged = (value) => setRatedstars(value);
    const handleClose = () =>{
        props.setmodal(false)
    }
    session.get('http://127.0.0.1:8000/api/basket/')
    .then(res=>{
        setuser(res.data.owner)
    })
    const handleClick = () =>{
        console.log("klik")
        props.setrefresh()
        if(textarearef.current.value.trim() !== "" && inputref.current.value.trim() !== "" && ratedstars !== 0){
            console.log("działa")
            let data ={
                "product":`${props.product.url}`,
                "title":`${inputref.current.value}`,
                "body":`${textarearef.current.value}`,
                "score":`${ratedstars}`,
                "user":`${user}`
            }
            console.log(data)
            session.post('http://127.0.0.1:8000/ratings/',data)
            .then(res=>{
                console.log(res.data)
                props.setmodal(false)
                console.log(data)
                
            })
            .catch(err=>{
                console.log(err.response.data)
            })
            
            
        }else{
            seterror(true)
        }
    }
    
    return ReactDOM.createPortal(
        <div className="modalbox">
            <div className="modalbox__container">
                <div className="modalbox__container__maintitle">
                    <div className="modalbox__container__maintitle-title">
                    <h1>Dodaj swoją opinię</h1>
                    </div>
                    <div className="modalbox__container__maintitle-close">
                        <i onClick={handleClose} class="fa fa-times-circle fa-3x" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="modalbox__container__title">
                    <div className="modalbox__container__title-title">
                        Tytuł
                    </div>
                <div className="modalbox__container__input-text">
                    <input ref={inputref} type="text"/>
                </div>
                </div>
                <div className="modalbox__container__stars">
                    <div className="modalbox__container__stars-title">
                        Ocena ogólna
                    </div>
                    <div className="modalbox__container__stars-container">
                        <ReactStars count={5} edit={true} size={24} value={ratedstars}color2={'#ffd700'} onChange={ratingChanged} />
                    </div>
                </div>
                <div className="modalbox__container__opinion">
                    <div className="modalbox__container__opinion-title">
                        Opinie
                    </div>
                
                    <div className="modalbox__container__opinion-textarea">
                        <textarea ref={textarearef}></textarea> 
                    </div>
                </div>
                <div className="modalbox__container__bottom">
                    {error && <p>Uzupełnij wszystkie dane</p>}
                <button onClick={handleClick}className="review__items__item__button-btn">Napisz recenzję produktu</button>
                
                <div className="modalbox__container__bottom-footer">
                    <p>Przesyłając, wyrażasz zgodę na przetwarzanie danych osobowych w celu wyświetlania recenzji produktów przez nas na swoich stronach internetowych i serwisach społecznościowych. Masz prawo wycofać swoją zgodę. Aby uzyskać więcej informacji, zobacz naszą zasadach przetwarzania danych osobowych.​</p>
                </div>
                </div>
            </div>
        </div>,document.querySelector('.profile')
    );
};

export default Modal;




