import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getAllItemsStart = () =>{
  return {
    type: actionTypes.GET_ALL_ITEMS_START
  };
}

export const getChildren = (array) => async(dispatch)=>{
  console.log("getChildren")
  for(let i=0;i<array.length;i++){
    for(let j=0;j<array[i].children.length;j++){
      let url = array[i].children[j].price
      await axios.get(url).then(
        res =>{
          console.log(res.data)
          let variable = array[i].children[j]
          // let arr = [res.data]
          variable["price"]= res.data
          
          console.log(array)
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
  console.log(array)
  
  
  dispatch(getChildren(array))
  dispatch(getAllItemsSuccess(array))
  
}
export const getAllItemsSuccess = (items) => {
  return {
    type: actionTypes.GET_ALL_ITEMS_SUCCESS,
    items: items
  };
};
export const getAllItemsFail = error => {
  return {
    type: actionTypes.GET_ALL_ITEMS_FAIL,
    error: error
  };
};  

export const getItemsStart = (start) => {
    console.log(start)
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
export const getItems = () => async(dispatch) => 
{
      let xd 
      
      dispatch(getItemsStart());
      await axios.get("http://127.0.0.1:8000/api/products/")
        .then(res => {
            xd = res.data
            const items= res.data
            console.log(items)
            let proba = {name: "John", age: 31, city: "New York"}
            let pop = []  
            for(let i=0; i<items.length;i++){
              
              let url= items[i].url
              axios.get(url).then(res =>
                { 
                  let length = res.data.children.length
                  if(length > 0){
                    pop.push(proba) 
                  }
                }
              )
            }
            
            
            
          }
        )
        dispatch(getArray(xd));
        
        dispatch(getItemsFail())
      };
  