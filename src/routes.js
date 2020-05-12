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
const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/shop/" component={Shop} />
    <Route exact path="/" component={Homepage} />
    <Route path="/payments" component={Payments} />
    <Route path="/item/:id" component={Item}/>
    <Route path="/basket/" component={Basket}/>
  </Hoc>
);

export default BaseRouter;
