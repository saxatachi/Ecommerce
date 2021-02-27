import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import "../css/payments.min.css"
import StripeCheckout from 'react-stripe-checkout'
import { PayPalButton } from "react-paypal-button-v2";
import { connect } from 'react-redux';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import axios from 'axios';
// Custom styling can be passed to options when creating an Element.
import React, { Component } from 'react'
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});

class Payments extends Component {
    
    state= {
        token1: '',
        addresses1: '',
        

      }
    render() {
      
        const {useraddress,user} = this.props;
        console.log(useraddress)
        const buttonStyles = {
            layout: 'vertical',
            shape: 'rect',
          }
        const paypalOptions = {
            clientId: '12345',
            intent: 'capture'
          }
        const lol = () =>{
            console.log("wywołanie funckji")
        }
        const onToken = () => {
            
            
            var obj = { name: "John", age: 30, city: "New York" };
            var obj1= JSON.stringify(obj)
            
            axios.post(`http://127.0.0.1:8000/charge/`, { obj1 })
                .then(res => {
      })
          }
          const handleToken = (tk) => {
            const proba={
                email : tk.email,
                nickname: tk.card.name,
                token: tk.id
            }
            var obj= JSON.stringify(proba)
            axios.post(`http://127.0.0.1:8000/charge/`, { obj })
                .then(res => {
                console.log(res);
                console.log(res.data);
      })
          }
          const handleClick = () =>{
            
            console.log("click")
            console.log(useraddress)
            session.get('http://127.0.0.1:8000/api/basket/')
            .then(res=>{
              // console.log(res.data)
              let data2= {
                "basket": `${user.basket}`,
                "guest_email": `${this.props.auth.email}`,
                "total": `${res.data.total_incl_tax}`,
                "shipping_method_code": "s",
                "shipping_charge": {
                    "currency": "PLN",
                    "excl_tax": "0.00",
                    // "incl_tax": `${this.props.deliverprice}`,
                    "incl_tax": "0.00",
                    "tax": "0.00"
                },
                "shipping_address": {
                  "first_name": `${useraddress.first_name}`,
                  "last_name": `${useraddress.last_name}`,
                  "line1": `${useraddress.line1}`,
                  "line2": `${useraddress.line2}`,
                  "line3": `${useraddress.line3}`,
                  "line4": `${useraddress.line4}`,
                  "postcode": `${useraddress.postcode}`,
                  "state": `${useraddress.state}`,
                  "country": "/api/countries/US/",
                  "phone_number": `${useraddress.phone_number}`
                },
                "user": `${user.user}`,
                "payment": {
                    "cash": {
                      "amount": "12.00",
                      "enabled": true
                    }
            }
            }
            let data3= {
              "basket": `${user.basket}`,
              "guest_email": `${useraddress.email}`,
              "total": `${res.data.total_incl_tax}`,
              "shipping_method_code": "s",
              "shipping_charge": {
                  "currency": "PLN",
                  "excl_tax": "0.00",
                  "incl_tax": `${this.props.deliverprice}`,
                  "incl_tax": "0.00",
                  "tax": "0.00"
              },
              "shipping_address": {
                "first_name": `${useraddress.first_name}`,
                "last_name": `${useraddress.last_name}`,
                "line1": `${useraddress.line1}`,
                "line2": `${useraddress.line2}`,
                "line3": `${useraddress.line3}`,
                "line4": `${useraddress.line4}`,
                "postcode": `${useraddress.postcode}`,
                "state": `${useraddress.state}`,
                "country": "/api/countries/US/",
                "phone_number": `${useraddress.phone_number}`
              },
              "user": `${user.user}`,
              "payment": {
                  "cash": {
                    "amount": "12.00",
                    "enabled": true
                  }
          }
          }
            
            console.log("checkout")
              console.log(data3)
                session.post("http://127.0.0.1:8000/api/checkout/",data3)
            .then(res=>{
              console.log("działa")
              console.log(res.data)
            })
            .catch(res=>{
              console.log("błąd")
              console.log(res)
              console.log(res.response)
            })
              
            })
            let data= {
              "guest_email": "joe@example.com",
              "basket": "http://127.0.0.1:8000/api/baskets/781/",
              "shipping_address": {
                  "first_name": `${useraddress.first_name}`,
                  "last_name": `${useraddress.last_name}`,
                  "line1": `${useraddress.line1}`,
                  "line2": `${useraddress.line2}`,
                  "line3": `${useraddress.line3}`,
                  "line4": `${useraddress.line4}`,
                  "postcode": `${useraddress.postcode}`,
                  "state": `${useraddress.state}`,
                  "country": "/api/countries/US/",
                  "phone_number": `${useraddress.phone_number}`,
              },
              "billing_address": {
                  "first_name": "Joe",
                  "last_name": "Schmoe",
                  "line1": "234 5th Ave",
                  "line4": "Manhattan",
                  "postcode": "10001",
                  "state": "NY",
                  "country": "/api/countries/US/",
                  "phone_number": "+1 (717) 467-1111",
              },
              "payment": {
                  "cash": {
                      "enabled": true,
                      "amount": "10.00",
                  },
                  "creditcard": {
                      "enabled": true,
                      "pay_balance": true,
                  }
              }
          }
        //   let data2= {
        //     "basket": `${user.basket}`,
        //     "guest_email": `${this.props.auth.email}`,
        //     "total": `${this.state.totalprice}`,
        //     "shipping_method_code": "s",
        //     "shipping_charge": {
        //         "currency": "PLN",
        //         "excl_tax": "0.00",
        //         "incl_tax": `${this.props.deliverprice}`,
        //         "tax": "0.00"
        //     },
        //     "shipping_address": {
        //       "first_name": `${useraddress.first_name}`,
        //       "last_name": `${useraddress.last_name}`,
        //       "line1": `${useraddress.line1}`,
        //       "line2": `${useraddress.line2}`,
        //       "line3": `${useraddress.line3}`,
        //       "line4": `${useraddress.line4}`,
        //       "postcode": `${useraddress.postcode}`,
        //       "state": `${useraddress.state}`,
        //       "country": "/api/countries/US/",
        //       "phone_number": `${useraddress.phone_number}`
        //     },
        //     "user": `${user.user}`,
        //     "payment": {
        //         "cash": {
        //           "amount": "12.00",
        //           "enabled": true
        //         }
        // }
        // }
        console.log("checkout")
            // session.post("http://127.0.0.1:8000/api/checkout/",data2)
            // .then(res=>{
            //   console.log(res.data)
            // })
            // .catch(res=>{
            //   console.log(res)
            // })
          }
          
          console.log("koniec checkout")
        return (
            <div className="payments">
                
                <h1>Płatności</h1>
                <button onClick={handleClick}>Proba checkout</button>
                <h1>Płatności</h1>
                <PayPalButton
                    amount="0.01"
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
 
                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                    method: "post",
                    body: JSON.stringify({
                    orderID: data.orderID
            })
          });
        }}
      />
                <button type="submit" onClick={onToken}>Proba send request</button>
                
                <StripeCheckout 
                stripeKey="pk_test_EsHEu4kQeXtUp2or3usiLzuu00MbZjNI5d"
                token={handleToken}
                // token={this.onToken}
                billingAddress
                shippingAddress
                amount={100*100}
                name="Zapłata"/>
                <PayPalButton
                    paypalOptions={paypalOptions}
                    buttonStyles={buttonStyles}
                    amount={1.00}
                />
            </div>
            
        )
    }
}
const mapStateToProps = state => {
  return {
  useraddress: state.checkout.useraddress.useraddress,
  allitems : state.items.allitems,
  selecteditems : state.items.selecteditems.items,
  default : state.items.default,
  user: state.checkout.user,
  auth: state.auth
  }
}

const mapDispatchToProps = () =>dispatch => {
  return {
    // getUserAddress: (x)=>dispatch(getUserAddress(x)),
    // getBasket: () =>dispatch(getBasket())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Payments)