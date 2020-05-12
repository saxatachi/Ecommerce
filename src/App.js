import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";
import {getItems, getAllItems} from "./store/actions/items";
import BaseLayout from "./containers/BaseLayout";
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getItems();
    
  }

  render() {
    console.log("załadowanie")
    console.log(this.props.allitems)
    if(this.props.allitems){
      console.log(this.props.allitems.items[0])
    }
    return (
      <Router>
        {this.props.for ?
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
    // getAllItems: (items)=>dispatch(getAllItems(items))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
