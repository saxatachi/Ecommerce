import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import BaseLayout from "./containers/BaseLayout"
import Profile from "./containers/Profile";
import Homepage from "./containers/Homepage";
import Shop from "./containers/Shop";
import App from "./containers/Payments";
import Payments from "./containers/Payments";
import Basket from "./containers/Basket";
import Item from "./containers/Item"
import Item1 from "./containers/Item1";
import Checkout from "./containers/Checkout";
const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile/" component={Profile} />
    <Route path="/shop/" component={Shop} />
    <Route exact path="/" component={Homepage} />
    <Route path="/payments" component={Checkout} />
    <Route path="/item/:id" component={Item1}/>
    <Route path="/basket/" component={Basket}/>
    
  </Hoc>
);

export default BaseRouter;
