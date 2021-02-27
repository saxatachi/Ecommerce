import React, { Component,useState,useRef,useEffect} from 'react'
import "../css/addaddress.min.css"
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const session = axios.create({
	withCredentials: true
});
const AddAddress = () => {
    useEffect(() => {
        session.get("http://127.0.0.1:8000/api/countries/")
        .then(res=>{
            createselectitems(res.data)
            setarray(createselectitems(res.data))

        })
    }, [])
    const createselectitems = (array) =>{
        let items = []
        for(let i=0;i<array.length;i++){
            items.push(<option onClick={()=>handlecountry(array[i])} key={array[i].url} value={array[i].printable_name}>{array[i].printable_name}</option>)
        }
        return items
    }
    const handlecountry = (item) =>{
        setactiveselect(false)
        setcountry(item.url)
        countryref.current.value = item.printable_name
    }
    const [array,setarray] = useState([])
    const nameref = useRef(null);
    const lastnameref = useRef(null);
    const bussinessref = useRef(null);
    const streetref = useRef(null);
    const housenumberref = useRef(null);
    const floatnumberref = useRef(null);
    const zipcoderef = useRef(null);
    const phoneref = useRef(null);
    const cityref = useRef(null);
    const countryref = useRef(null);
    const [country,setcountry] = useState(null)
    const [activeselect,setactiveselect] = useState(false)
    const handleClick = () =>{
        console.log("klik")
        
        if(nameref.current.value !== "" && lastnameref.current.value !== "" && housenumberref.current.value !== "" && cityref.current.value !== ""&& zipcoderef.current.value !== "" && phoneref.current.value !== "" && country !== null){
        let data ={
            "first_name": `${nameref.current.value}`,
            "last_name": `${lastnameref.current.value}`,
            "line1": `${housenumberref.current.value}`,
            "line2": `${streetref.current.value}`,
            "line3": `${floatnumberref.current.value}`,
            "line4": "",
            "state": `${cityref.current.value}`,
            "postcode": `${zipcoderef.current.value}`,
            "phone_number":   `${"+48"}${phoneref.current.value}`,
            "notes": "",
            "is_default_for_shipping": false,
            "is_default_for_billing": false,
            "country": `${country}`
        }
        console.log(data)
        session.post('http://127.0.0.1:8000/api/useraddresses/',data)
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
        })
        }
             

    }
    return (
    <div className="addaddress">
        <div className="addaddress__title">
        <h1>TWÓJ ADRES</h1>
        <p>Aby dodać nowy adres, wypełnij poniższy formularz</p>
        *Pole wymagane
        </div>
        <div className="addaddress__firstcolumn">
        <label><span>Imię *</span></label>
        <input ref={nameref} placeholder="Imię"/>
        <label><span>Nazwisko *</span></label>
        <input ref={lastnameref} placeholder="Nazwisko"/>
        <label><span>Nazwa firmy</span></label>
        <input ref={bussinessref} placeholder="Nazwa Firmy"/>
        <label><span>Kraj*</span></label>
        <div className="addaddress__country">
        <input disabled ref={countryref} placeholder="Kraj"></input>
        <i onClick={()=>setactiveselect(!activeselect)} class="fa fa-caret-down fa-2x" aria-hidden="true"></i>
        </div>
        
        <select style={{display:activeselect ? 'block' : 'none' }} id="country" size ="5">
            {array}
        </select><br/>
        
        <label><span>Ulica *</span></label>
        <input ref={streetref} placeholder="Ulica"/>
        </div>
        <div className="addaddress__secondcolumn">
        <label><span>Nr domu *</span></label>
        <input ref={housenumberref} placeholder="Nr domu"/>
        <label><span>Nr mieszkania</span></label>
        <input ref={floatnumberref} placeholder="Nr Mieszkania"/>
        <label><span>Kod pocztowy *</span></label>
        <input ref={zipcoderef} placeholder="Kod Pocztowy" id="zip" name="zip" type="text" pattern="\d{2}-\d{3}"></input>
        <label><span>Telefon kontaktowy*</span></label>
        <input ref={phoneref} placeholder="Telefon kontaktowy"/>
        <label><span>Miejscowość *</span></label>
        <input ref={cityref} placeholder="Miejscowość"/><br/>
        <div className="addaddress-button">
        <button onClick={handleClick}>Zapisz</button>
        </div>
        </div>
    </div>
    );
};

export default AddAddress;