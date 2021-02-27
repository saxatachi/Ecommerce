import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
    useraddress: null, 
    user: null,
    email: null
    
    
  };
  const postEmail = (state,action) =>{
    return updateObject(state,{
      email: action
    })
  }
  const getUserAddress = (state,action)=>{
    return updateObject(state,{
        useraddress: action
    })
  }
  const postUser = (state,action)=>{
    return updateObject(state,{
        user: action
    })
  }

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case actionTypes.GET_USERADDRESS:
        return getUserAddress(state,action)
      case actionTypes.POST_USER:
        return postUser(state,action)
      case actionTypes.POST_EMAIL:
        return postEmail(state,action)
      default:
        return state;
    }
};
  
export default reducer;