import React,{useEffect,useState} from 'react';
import axios from 'axios';
import "../css/checkout.min.css";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepProgressBar from 'react-step-progress';
import AddAddress from './AddAddress';
import CheckoutOrder from './CheckoutOrder';
import {postUser} from "../store/actions/checkout";
// import { Steps } from 'rsuite';
import { Steps } from 'antd';
import 'antd/dist/antd.css';
import CheckoutAddress from './CheckoutAddress'
import { connect } from 'react-redux';
import 'rsuite/lib/styles/index.less';
// import the stylesheet
import 'react-step-progress/dist/index.css';
import Payments from './Payments';
import AddAddress1 from './AddAddress1';


// import "react-step-progress-bar/styles.css";
// import { ProgressBar, Step } from "react-step-progress-bar";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const session = axios.create({
	withCredentials: true
});

const Checkout = props => {
    const { Step } = Steps;
    const [barnumber,setbarnumber] = useState(0)
    const [total,settotal] = useState(0)
    const [deliverprice,setdeliverprice] = useState(null)
    const [addressIs,setaddressIs] = useState(false)
    
    useEffect(()=>{
        session.get('http://127.0.0.1:8000/api/basket/')
        .then(res=>{
            console.log(res.data)
            settotal(res.data.total_incl_tax)
            props.postUser(res.data.owner,res.data.url)
        })
        session.get('http://127.0.0.1:8000/api/login/')
        .then(res=>{
          console.log(res.data)
          if(res.data !== ""){
            session.get('http://127.0.0.1:8000/api/useraddresses/')
            .then(res=>{
            console.log(res.data)
            if(res.data.length>0){
              setaddressIs(true)
            }
        })
          }
        })
        
    },[])
    const setstatenumber =(e) =>{
        setbarnumber(e)
    }    
    const handleBackbutton = ()=>{
      if(barnumber=== 2){
        setdeliverprice(null)
      }
      setbarnumber(barnumber-1)
      
    }
    
    return (
        <div className="checkout">
            <div className="checkout__account">
                <div className="checkout__account__bar" >
                <Steps current={barnumber}>
                    <Step title="Adres" description="Wybierz adres z poniższych lub stwórz nowy." />
                    <Step title="Sposób dostawy "  description="Wybierz na jaki sposób dostawy się decydujesz." />
                    <Step title="Sposób płatności" description="This is a description." />
                </Steps>
                
                </div>
                <div className="checkout__account__options">
                {barnumber == 0 && <CheckoutAddress setbarnumber={setbarnumber} setstatenumber={setstatenumber} barnumber={barnumber}/> }
                {barnumber == 1 && <DeliveryOptions setdeliverprice={setdeliverprice} setstatenumber={setstatenumber}/>}
                {barnumber == 2 && <Payments deliverprice={deliverprice}/>}
                
                </div>
                {barnumber > 0 && <div onClick={handleBackbutton}className="checkout__account__backbutton">Wróć</div>}
            </div>
            <div className="checkout__order">
                <CheckoutOrder />
                <div className="checkout__order__summary">
                    <div className="checkout__order__summary__discounts">Naliczone Rabaty :<div className="checkout__order__summary__discounts-price"> 0zł</div></div> 
                    <div className="checkout__order__summary__delivery">Cena dostawy : <div className="checkout__order__summary__delivery-price">{deliverprice !== null ? deliverprice + " "+"zł" : 'Wybieramy w 2 kroku'}</div></div>
                    <div className="checkout__order__summary__total">Całość do zapłaty :&nbsp; <div className="checkout__order__summary__total-price">{deliverprice == null ? total : (parseFloat(total) + parseFloat(deliverprice)).toFixed(2)} zł</div></div>
                </div>



            </div>
            
        </div>
    );
};


const DeliveryOptions = props => {
    const handledelivery = (number) =>{
      let parsednumber = parseFloat(prices[number])
      props.setdeliverprice(parsednumber.toFixed(2))
      props.setstatenumber(2)
    }
    const prices = [
      "11.90",
      "12.90",
      "20.90",
      "14.90",
      "0.00"
    ]
    return (
        <div className="delivery__options">
            
            <table id="delivery-table">
              <tr>
                <th>Nazwa kuriera</th>
                <th>Przybliżony czas</th>
                <th>Koszta</th>
                <th>Wybierz</th>
              </tr>
              <tr>
                <td>Dhl</td>
                <td>1-2 dni</td>
                <td>{prices[0]} zł</td>
                <td onClick={()=>handledelivery(0)}><div className="tablecircle"><i class="fa fa-check-circle fa-3x" aria-hidden="true"></i></div></td>
                

              </tr>
              <tr>
                <td>Poczta Polska</td>
                <td>3-7 dni</td>
                <td>{prices[1]} zł</td>
                <td onClick={()=>handledelivery(1)}><div className="tablecircle"><i class="fa fa-check-circle fa-3x" aria-hidden="true"></i></div></td>
              </tr>
              <tr>
                <td>Dpd</td>
                <td>1-2 dni</td>
                <td>{prices[2]} zł</td>
                <td onClick={()=>handledelivery(2)}><div className="tablecircle"><i class="fa fa-check-circle fa-3x" aria-hidden="true"></i></div></td>
              </tr>
              <tr>
                <td>FedEx</td>
                <td>3-5 dni</td>
                <td>{prices[3]} zł</td>
                <td onClick={()=>handledelivery(3)}><div className="tablecircle"><i class="fa fa-check-circle fa-3x" aria-hidden="true"></i></div></td>
              </tr>
              <tr>
                <td>Odbiór osobisty</td>
                <td>Natychmiast</td>
                <td>{prices[4]} zł</td>
                <td onClick={()=>handledelivery(4)}><div className="tablecircle"><i class="fa fa-check-circle fa-3x" aria-hidden="true"></i></div></td>
              </tr>
            </table>
        </div>
    );
};
const mapStateToProps = state => {
  return {
  // useraddress: state.checkout.useraddress.useraddress,
  allitems : state.items.allitems,
  selecteditems : state.items.selecteditems.items,
  default : state.items.default
  }
}

const mapDispatchToProps = () =>dispatch => {
  return {
    // getUserAddress: (x)=>dispatch(getUserAddress(x)),
    // getBasket: () =>dispatch(getBasket())
    postUser: (x,y) =>dispatch(postUser(x,y))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);