// import React, { Component } from 'react'
// import "../css/personaldata.min.css"
//  class PersonalData extends Component {
//     render() {
//         return (
//             <div className="personaldata">
//                 <div className="personaldata__title">
//                     <h1>Zarządzanie hasłem</h1>
//                 </div>
//                 <div className="personaldata__form">
                    
//                     <h2>Zmiana hasła</h2>
//                     <label><span>Obecne hasło</span></label>
//                     <input onChange type="text" placeholder="obecne hasło"></input><br />
//                     <label><span>Nowe hasło</span></label>
//                     <input type="text" placeholder="nowe hasło"></input><br />
//                     <label><span>Potwierdź nowe hasło</span></label>
//                     <input type="text" placeholder="Potwierdź nowe hasło"></input><br />
//                     <div className="accept-button">
//                     <button>Zaakceptuj zmianę hasła</button>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// export default PersonalData;
import React,{useState} from 'react';
import PropTypes from 'prop-types';
import "../css/personaldata.min.css"
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
const PersonalData = props => {
    const [oldPassword,setoldPassword] = useState('')
    const [newPassword,setnewPassword] = useState('')
    const [error,seterror] = useState('')
    const [success,setsuccess]=useState('')
    
    const handleChange = ()=>{
        setsuccess('')
        seterror('')
        let data = {
            "old_password": oldPassword,
            "new_password": newPassword
        }
        console.log(data)
        session.put('http://127.0.0.1:8000/api/user/change/',data)
        .then(res=>{
            console.log(res)
            if(res.data.message ==="Password updated successfully"){
                setsuccess("Hasło zostało zmienione")
            }
        })
        .catch(error=>{
            if(error.response.data.detail === "Nie podano danych uwierzytelniających."){
                seterror("Podaj poprawne dane ")
            }
            console.log(error.response.data.detail)
        })
    }
    return (
        <div className="personaldata">
                <div className="personaldata__title">
                    <h1>Zarządzanie hasłem</h1>
                </div>
                <div className="personaldata__form">
                    
                    <h2>Zmiana hasła</h2>
                    <label><span>Obecne hasło</span></label>
                    <input onChange={(e)=>{setoldPassword(e.target.value)}} type="password" placeholder="obecne hasło"></input><br />
                    <label><span>Nowe hasło</span></label>
                    <input onChange={(e)=>{setnewPassword(e.target.value)}} type="password" placeholder="nowe hasło"></input><br />
                    {error !== '' && error}
                    {success !== '' && success}
                    <div className="accept-button">
                    <button onClick={handleChange}>Zaakceptuj zmianę hasła</button>
                    </div>
                </div>
            </div>
    );
};



export default PersonalData;