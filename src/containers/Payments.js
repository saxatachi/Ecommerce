import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import "../css/payments.min.css"
import StripeCheckout from 'react-stripe-checkout'
import { PayPalButton } from "react-paypal-button-v2";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import axios from 'axios';
// Custom styling can be passed to options when creating an Element.
import React, { Component } from 'react'

class Payments extends Component {
    state= {
        token1: '',
        addresses1: ''

      }
    render() {
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
            
            console.log("proba kliknięcia")
            var obj = { name: "John", age: 30, city: "New York" };
            var obj1= JSON.stringify(obj)
            console.log(obj1)
            console.log(obj)
            axios.post(`http://127.0.0.1:8000/charge/`, { obj1 })
                .then(res => {
                console.log(res);
                console.log(res.data);
      })
          }
          const handleToken = (tk) => {
            console.log(tk)
            const proba={
                email : tk.email,
                nickname: tk.card.name,
                token: tk.id
            }
            var obj= JSON.stringify(proba)
            console.log(proba)
            axios.post(`http://127.0.0.1:8000/charge/`, { obj })
                .then(res => {
                console.log(res);
                console.log(res.data);
      })
          }

        // function handleToken(token,addresses){
        //     console.log(token,addresses)
        //     this.setState({
        //         token1: token,
        //         addresses1: addresses
        //     })
        // }

        
        return (
            <div className="payments">
                <h1>Płatności</h1>
                
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

export default Payments