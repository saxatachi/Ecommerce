import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getUserAddress = (item) => dispatch =>{
    console.log(item)
    dispatch(getUserAddressData(item))
      
  }
export const getUserAddressData = action =>{
    return{
      type: actionTypes.GET_USERADDRESS,
      useraddress: action
    }
  }
export const postUser = (user,basket) => dispatch=>{
  console.log("postUSer")
  console.log(user)
  console.log(basket)
  dispatch(postUserData(user,basket))
}
export const postUserData = (user,basket) =>{
  console.log(basket)
  return{
    type: actionTypes.POST_USER,
    user: user,
    basket: basket
    
  }
}
export const postEmail = (email) => dispatch =>{
  console.log("postEmail")
  dispatch(postEmailData)
}
export const postEmailData = (email)=>{
  return{
    type: actionTypes.POST_EMAIL,
    email: email
  }
}