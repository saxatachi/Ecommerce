import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  userId : null,
  username : null,
  firstname: null,
  lastname: null,
  email: null,
};
const login = (state,action) =>{
  console.log("o co tu chodzi")
  console.log(action)
  console.log(action.user)
  return updateObject(state,{
    username: action.user.username,
    firstname: action.user.first_name,
    lastname: action.user.last_name,
    email: action.user.email
  })
}
const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    error: null,
    loading: false,
    userId : action.user.userId
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.LOGIN:
      return login(state,action);
    case actionTypes.LOGIN_SUCCESS:
      return login(state,action);
    default:
      return state;
  }
};

export default reducer;
