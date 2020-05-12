import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


const initialState = {
    items: null,
    error: null,
    loading: false,
    isLoadeditems: false,
    allitems: null,
    allerror: null,
    allloading: false,
    isAllLoadedItems:false,
    mainarray: null,
    for: false
  };
const getChildren = (state,action)=>{
  return updateObject(state,{
    for: true
  })
}
const getArray = (state,action) =>{
  return updateObject(state,{
    mainarray: action
  });
}
const getAllItemsStart = (state, action) => {
  return updateObject(state, {
    for: true
  });
};
const getAllItemsSuccess = (state, action) => {
  return updateObject(state, {
    allitems: action,
    allerror: null,
    allloading: false,
    allisLoadeditems:true
    
  });
};
const getAllItemsFail = (state, action) => {
  return updateObject(state, {
    allerror: action.error,
    allloading: false
  });
};
const getItemsStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
const getItemsSuccess = (state, action) => {
    return updateObject(state, {
      items: action,
      error: null,
      loading: false,
      isLoadeditems:true
      
    });
  };
  
  const getItemsFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_ARRAY:
        return getArray(state,action)
      case actionTypes.GET_CHILDREN:
        return getChildren(state,action)
      case actionTypes.GET_ALL_ITEMS_START:
        return getAllItemsStart(state, action);
      case actionTypes.GET_ALL_ITEMS_SUCCESS:
        return getAllItemsSuccess(state, action);
      case actionTypes.GET_ALL_ITEMS_FAIL:
        return getAllItemsFail(state, action);
      case actionTypes.GET_ITEMS_START:
        return getItemsStart(state, action);
      case actionTypes.GET_ITEMS_SUCCESS:
        return getItemsSuccess(state, action);
      case actionTypes.GET_ITEMS_FAIL:
        return getItemsFail(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;