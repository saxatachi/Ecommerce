import React,{useEffect,useState} from 'react';
import "../css/itemvariants.min.css";
import axios from "axios"
import { useHistory } from 'react-router-dom';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});


const ItemVariants = (props) => {
    let history = useHistory()
    const [image,setImage] = useState()
    const [object,setObject] = useState()
    const [alt,setAlt] = useState("")
    const [id,setid] = useState()
    
    useEffect(() => {
        session.get(props.item.url)
            .then(res=>{
                setObject(res.data)
                setid(res.data.id)
                if(res.data.images[0]!== undefined){
                setImage(res.data.images[0].original)
                }else{
                    setAlt("brak zdjęcia")
                }
            })
            .catch(res=>{
                console.log(res.data)
            })
        
    }, [])
    return (
        <div className="variant">
            <img onClick={()=>props.handlePush(id,object)} src={image} alt={alt} />
            {props.item.url === props.url && <i class="fa fa-check " aria-hidden="true"></i>}
        </div>
    );
};

export default ItemVariants;