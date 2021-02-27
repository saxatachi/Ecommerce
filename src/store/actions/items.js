import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getAllItemsStart = () =>{
  return {
    type: actionTypes.GET_ALL_ITEMS_START
  };
}
const data = {
  url: "http://127.0.0.1:8000/api/products/22/",
  quantity: 1,
}

export const getChildren = (array) => async(dispatch)=>{
  for(let i=0;i<array.length;i++){
      for(let j=0;j<array[i].children.length;j++){
      let url = array[i].children[j].price
      await transport.get(url).then(
        res =>{
          let variable = array[i].children[j]
          variable["price"]= res.data
        }
      )
  }
}
console.log(array[4].children[0].price)
dispatch(getAllItemsStart())
}
export const getArray = (pop) => async(dispatch)=>{
  let array =[]
  console.log("pop w getArray")
  console.log(pop) 
  for(let i=0; i<pop.length;i++){
    let url = pop[i].url
    await axios.get(url).then(
      res=>{
        if(res.data.structure==="parent"){
          array.push(res.data)
        }
      }
    )}  
  
  dispatch(getChildren(array))
  dispatch(getAllItemsSuccess(array))
  
}


export const getAllItemsSuccess = (items) => {
  return {
    type: actionTypes.GET_ALL_ITEMS_SUCCESS,
    items: items
  };
};
export const getDefaultSuggestions = (items) =>{
  return{
    type: actionTypes.GET_DEFAULT_SUGGESTIONS,
    items: items
  }
}
export const getAllItemsFail = error => {
  return {
    type: actionTypes.GET_ALL_ITEMS_FAIL,
    error: error
  };
};  

export const getItemsStart = (start) => {
    return {
      type: actionTypes.GET_ITEMS_START
    };
  };
export const getItemsSuccess = (items) => {
    return {
      type: actionTypes.GET_ITEMS_SUCCESS,
      
    };
  };
export const getItemsFail = error => {
    return {
      type: actionTypes.GET_ITEMS_FAIL,
      error: error
    };
  }; 
export const getSelectedItems = items =>{
  return{
    type: actionTypes.GET_SELECTED_ITEMS,
    items: items
  }
}
export const getBasketData = item =>{
  return{
    type: actionTypes.GET_BASKET,
    basketlength: item
  }
}
export const getCategoryData = action =>{
  return{
    type: actionTypes.GET_CATEGORY,
    category: action
  }
}
  const transport = axios.create({
    withCredentials: true
  }) 
export const getBasket = () => dispatch=>{
  transport.get('http://127.0.0.1:8000/api/basket/')
    .then(res=>{
      transport.get(`${res.data.lines}`)
      .then(res=>{
        dispatch(getBasketData(res.data.length))
      })
    })
}
export const getCategory = (item) => dispatch =>{
  transport.get(`http://127.0.0.1:8000/api/products/?categories=${item}`)
    .then(res=>{
      console.log(res.data)
      dispatch(getCategoryData(res.data))
    })
}
export const getUserAddress = () => dispatch =>{
  console.log("to powinien byc item")
  // dispatch(getUserAddressData(item))
    
}
export const getUserAddressData = action =>{
  return{
    type: actionTypes.GET_USERADDRESS,
    useraddress: action
  }
}
export const getItems = () => async(dispatch) => 
{
      let allitems=null
      let selecteditems= []
      let defaultsuggestions = []
      dispatch(getItemsStart());
      await transport.get("http://127.0.0.1:8000/api/products/")
        .then(res => {
            allitems = res.data
            const items= res.data
            for(let i=0;i<res.data.length;i++){
              if(res.data[i].structure === "parent" || res.data[i].structure === "standalone"){
                selecteditems.push(res.data[i])
              }
            }  
          }
        )
        await transport.get("http://127.0.0.1:8000/default/")
        .then(res=>{
          for(let i=0;i<res.data.length;i++){
            defaultsuggestions.push(res.data[i])
          }
        })
        
        dispatch(getSelectedItems(selecteditems))
        dispatch(getBasket())
        dispatch(getAllItemsSuccess(allitems))
        dispatch(getDefaultSuggestions(defaultsuggestions))
      };
  