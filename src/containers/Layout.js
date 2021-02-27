import React,{useState,useEffect} from "react";
import Modal from './Modals'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Icon
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout,getlogin } from "../store/actions/auth";
import {getItems, getBasket} from "../store/actions/items";
import { useHistory } from 'react-router-dom';
import axios from "axios"
import "../css/menu.min.css"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
const session = axios.create({
	withCredentials: true
});
// class CustomLayout extends React.Component {
  
//   state={
//     number : 0
//   }
//   componentDidMount(){
//     session.get('http://127.0.0.1:8000/api/basket/')
//     .then(res=>{
//       session.get(`${res.data.lines}`)
//       .then(res=>{
//         this.setState({
//           number: res.data.length
//         })
//       })
//     })
//   }
//   componentDidUpdate(){
//     this.props.getBasket()
//   }
//   handleLogout= ()=>{
    
//     console.log("Wyloguj się")
//     session.get('http://127.0.0.1:8000/api/user/logout/')
//     .then(res=>{
//       this.props.login()
//     })
    
//   }
//   render() {
    
//     console.log("username")
//     console.log(this.props.username)
//     const { authenticated,userId } = this.props;
//     return (
//       <div id="layout">
//         <Menu fixed="top" inverted>
//           <Container>
//             <Link to="/">
//               <Menu.Item header>Strona Domowa</Menu.Item>
//             </Link>
//             {authenticated ? (<>
//               <Menu.Item header onClick={() => this.props.logout()}>
//                 Logout
//               </Menu.Item>
//             </>
              
//             ) : (
//               <React.Fragment>
//                 <Link to="/shop">
//                   <Menu.Item header>Produkty </Menu.Item>
//                 </Link>
//                 <Link to={`/profile/${userId}`}>
//                   <Menu.Item header>Twój Profil</Menu.Item>
//               </Link>
//                 <Menu.Menu position='right'>
//                 {this.props.username === undefined ?
//                 <>
//                 <Link to="/login">
//                   <Menu.Item header>Logowanie</Menu.Item>
//                 </Link>
//                 <Link to="/signup">
//                   <Menu.Item header>Rejestracja</Menu.Item>
//                 </Link>
//                 </>: <Menu.Item header>Witaj {this.props.username}</Menu.Item>}
//                 <Link to="/basket">
//                   <Menu.Item  floated='right'><Icon name="shopping basket" size='large'></Icon><div className="basketnumer">{this.props.basketlength}</div></Menu.Item>
//                 </Link>
//                 {this.props.username !== undefined &&
//                   <Menu.Item onClick={()=>{this.handleLogout()}} header>Wyloguj się</Menu.Item>
//                 }
//                 </Menu.Menu>
//               </React.Fragment>
//             )}
//           </Container>
//         </Menu>

//         {this.props.children}

//         <Segment
//           inverted
//           vertical
//           style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
//         >
//           <Container textAlign="center">
//             <Grid divided inverted stackable>
//               <Grid.Column width={3}>
//                 <Header inverted as="h4" content="Group 1" />
//                 <List link inverted>
//                   <List.Item as="a">Link One</List.Item>
//                   <List.Item as="a">Link Two</List.Item>
//                   <List.Item as="a">Link Three</List.Item>
//                   <List.Item as="a">Link Four</List.Item>
//                 </List>
//               </Grid.Column>
//               <Grid.Column width={3}>
//                 <Header inverted as="h4" content="Group 2" />
//                 <List link inverted>
//                   <List.Item as="a">Link One</List.Item>
//                   <List.Item as="a">Link Two</List.Item>
//                   <List.Item as="a">Link Three</List.Item>
//                   <List.Item as="a">Link Four</List.Item>
//                 </List>
//               </Grid.Column>
//               <Grid.Column width={3}>
//                 <Header inverted as="h4" content="Group 3" />
//                 <List link inverted>
//                   <List.Item as="a">Link One</List.Item>
//                   <List.Item as="a">Link Two</List.Item>
//                   <List.Item as="a">Link Three</List.Item>
//                   <List.Item as="a">Link Four</List.Item>
//                 </List>
//               </Grid.Column>
//               <Grid.Column width={7}>
//                 <Header inverted as="h4" content="Footer Header" />
//                 <p>
//                   Extra space for a call to action inside the footer that could
//                   help re-engage users.
//                 </p>
//               </Grid.Column>
//             </Grid>

//             <Divider inverted section />
//             <Image centered size="mini" src="/logo.png" />
//             <List horizontal inverted divided link size="small">
//               <List.Item as="a" href="#">
//                 Site Map
//               </List.Item>
//               <List.Item as="a" href="#">
//                 Contact Us
//               </List.Item>
//               <List.Item as="a" href="#">
//                 Terms and Conditions
//               </List.Item>
//               <List.Item as="a" href="#">
//                 Privacy Policy
//               </List.Item>
//             </List>
//           </Container>
//         </Segment>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     authenticated: state.auth.user !== null,
//     userId: state.auth.userId,
//     basketlength: state.items.basketlength,
//     username: state.auth.username
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     logout: () => dispatch(logout()),
//     getItems: () =>dispatch(getItems()),
//     getBasket: () =>dispatch(getBasket()),
//     login: ()=>dispatch(getlogin())


//   };
// };

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(CustomLayout)
// );


const CustomLayout = props => {
  const handleLogout= ()=>{
    console.log("Wyloguj się")
    session.get('http://127.0.0.1:8000/api/user/logout/')
    .then(res=>{
      props.login()
    })
    
  }
  console.log("custom layout")
  console.log(props.auth)
  return (
    <div>
      <Menu fixed="top" inverted>
          <Container>
            <Link to="/">
              <Menu.Item header>Strona Domowa</Menu.Item>
            </Link>
            {props.authenticated ? (<>
              <Menu.Item header onClick={() => this.props.logout()}>
                Logout
              </Menu.Item>
            </>
              
            ) : (
              <React.Fragment>
                <Link to="/shop">
                  <Menu.Item header>Produkty </Menu.Item>
                </Link>
                {props.auth.username !== undefined && <Link to={`/profile/${props.userId}`}>
                  <Menu.Item header>Twój Profil</Menu.Item>
                </Link>}
                <Menu.Menu position='right'>
                {props.username === undefined ?
                <>
                <Link to="/login">
                  <Menu.Item header>Logowanie</Menu.Item>
                </Link>
                <Link to="/signup">
                  <Menu.Item header>Rejestracja</Menu.Item>
                </Link>
                </>: <Menu.Item header>Witaj {props.username}</Menu.Item>}
                <Link to="/basket">
                  <Menu.Item  floated='right'><Icon name="shopping basket" size='large'></Icon><div className="basketnumer">{props.basketlength}</div></Menu.Item>
                </Link>
                {props.username !== undefined &&
                  <Menu.Item onClick={()=>{handleLogout()}} header>Wyloguj się</Menu.Item>
                }
                </Menu.Menu>
              </React.Fragment>
            )}
          </Container>
        </Menu>

        {props.children}

        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 1" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 2" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 3" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header inverted as="h4" content="Footer Header" />
                <p>
                  Extra space for a call to action inside the footer that could
                  help re-engage users.
                </p>
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            <Image centered size="mini" src="/logo.png" />
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    authenticated: state.auth.user !== null,
    userId: state.auth.userId,
    basketlength: state.items.basketlength,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getItems: () =>dispatch(getItems()),
    getBasket: () =>dispatch(getBasket()),
    login: ()=>dispatch(getlogin())


  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
