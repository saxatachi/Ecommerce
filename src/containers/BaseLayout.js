import React, { Component } from 'react'
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import {getItems} from "../store/actions/items";
import { Link, withRouter } from "react-router-dom";
import {
    Container,
    Menu,
  } from "semantic-ui-react";
class BaseLayout extends Component {
    componentDidMount(){
        // this.props.getItems()
      }
    render() {
        const { authenticated,userId } = this.props;
        return(
            <div className="top__menu">
            <Menu fixed="top" inverted>
              <Container>
                <Link to="/">
                  <Menu.Item header>Home</Menu.Item>
                </Link>
                {authenticated ? (<>
                  <Menu.Item header onClick={() => this.props.logout()}>
                    Logout
                  </Menu.Item>
                  <Link to={`/profile/${userId}`}>
                      <Menu.Item header>profil</Menu.Item>
                  </Link>
                </>
                  
                ) : (
                  <React.Fragment>
                    <Link to="/login">
                      <Menu.Item header>Login</Menu.Item>
                    </Link>
                    <Link to="/signup">
                      <Menu.Item header>Signup</Menu.Item>
                    </Link>
                    
                  </React.Fragment>
                )}
              </Container>
            </Menu>
            </div>
        )
        
    }
}
const mapStateToProps = state => {
    return {
      authenticated: state.auth.user !== null,
      userId: state.auth.userId
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(logout()),
      getItems: () =>dispatch(getItems())
  
    };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BaseLayout));