import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {getBasket} from "../store/actions/items";
import { connect } from 'react-redux';
import {getlogin} from "../store/actions/auth"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
  const session = axios.create({
	withCredentials: true
});
  const classes = useStyles();
  const [username, setusername] = useState('');
  const [password,setpassword] = useState('');
  const [loginerror,setloginerror] = useState('')
  const [passworderror,setpassworderror] = useState('')
  const [error,seterror] = useState('')
  const history = useHistory()
  // useEffect(()=>{
  //   console.log("wylogowanie")
  //   session.get('http://127.0.0.1:8000/api/user/logout/')
  // })
  const handleClick = (e) => {
    e.preventDefault()
    setloginerror('')
    setpassworderror('')
    seterror('')
    let data ={
      "username": username,
      "password": password
  } 
    // props.getlogin()
    session.post('http://127.0.0.1:8000/api/login/',data)
    .then(res=>{
      console.log("dodane dane")
      // session.get('http://127.0.0.1:8000/api/login/')
      // .then(res=>{
      //   console.log(res.data)
      // })
      props.getlogin()
      history.push('/')
      
    })
    .catch(error => {
      if(error.response.data.username){
        setloginerror(error.response.data.username[0])
      }
      if(error.response.data.password){
        setpassworderror(error.response.data.password[0])
      }
      if(error.response.data.non_field_errors == 'invalid login'){
        seterror("Nieprawidłowe dane logowania ")
      }
  });
    
    
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange = {(e)=>{setusername(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Nazwa użytkownika"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {loginerror !== '' && loginerror}
          <TextField
            onChange = {(e)=>{setpassword(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {error !== '' && error}
          {passworderror !== '' && passworderror}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
const mapStateToProps = state => {
  return {
 
  allitems : state.items.allitems,
  selecteditems : state.items.selecteditems.items,
  default : state.items.default
  }
}
const mapDispatchToProps = dispatch => {
  return {
      getBasket: () =>dispatch(getBasket()),
      getlogin: ()=>dispatch(getlogin()),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);