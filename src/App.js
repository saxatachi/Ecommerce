import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";
import {getItems, getAllItems} from "./store/actions/items";
import {getlogin} from "./store/actions/auth"
import BaseLayout from "./containers/BaseLayout";
import {postEmail} from "./store/actions/checkout"
import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getItems();
    this.props.getlogin();
    session.get('http://127.0.0.1:8000/api/login/')
    .then(res=>{
      console.log(res.data)
      console.log(res.data.username)
      if(res.data === ""){
        console.log("puste")
      }
      console.log(res.data.email)
      this.props.postEmail(res.data.email)
      console.log("sprawdzenie logowania")
    })
  }
  

  render() {
    console.log(this.props.allitems)
    if(this.props.allitems){
      console.log(this.props.allitems.items[0])
    }
    return (
      <Router>
        {this.props.isLoadedItems ?
        <CustomLayout {...this.props}>
          <BaseRouter />
        </CustomLayout> 
        : <h1>Ładowanie</h1>}
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isLoadedItems: state.items.isLoadeditems,
    mainarray : state.items.mainarray,
    allitems : state.items.allitems,
    allLoaded: state.items.allisLoadeditems,
    for: state.items.for

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    getItems: () =>dispatch(getItems()),
    getlogin: ()=>dispatch(getlogin()),
    postEmail: (x)=>dispatch(postEmail(x))
    // getAllItems: (items)=>dispatch(getAllItems(items))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
