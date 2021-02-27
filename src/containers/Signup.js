import React,{useState} from 'react';
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
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
  const session = axios.create({
	withCredentials: true
});
  const classes = useStyles();
  const [username, setusername] = useState('');
  const [firstname,setfirstname] = useState('');
  const [lastname,setlastname]= useState('')
  const [password,setpassword] = useState('');
  const [password1,setpassword1]= useState('')
  const [email,setemail]= useState('')
  const [usernameerror,setusernameerror] = useState('');
  const [firstnameerror,setfirstnameerror] = useState('');
  const [lastnameerror,setlastnameerror] = useState('');
  const [passworderror,setpassworderror] = useState('');
  const [password1error,setpassword1error] = useState('');
  const [emailerror,setemailerror] = useState('');
  const [error,seterror] = useState('');
  const history = useHistory();
  const handleClick = (e) =>{
    e.preventDefault()
    setusernameerror('')
    setfirstnameerror('')
    setlastnameerror('')
    setpassworderror('')
    setpassword1error('')
    setemailerror('')
    seterror('')
    let data = {
      "username": username,
      "first_name": firstname,
      "last_name": lastname,
      "password": password,
      "password2": password1,
      "email": email
    }

    session.post('http://127.0.0.1:8000/api/user/register/',data)
    .then(res=>{
      console.log(res)
      if(res.data.username){
        setusernameerror(res.data.username[0])
        
      }
      if(res.data.first_name){
        setfirstnameerror(res.data.first_name[0])
        
      }
      if(res.data.last_name){
        setlastnameerror(res.data.last_name[0])
      }
      if(res.data.password){
        setpassworderror(res.data.password[0])
      }
      if(res.data.password2){
        setpassword1error(res.data.password2[0])
      }
      if(res.data.email){
        setemailerror(res.data.email[0])
      }
      if(res.data.response){
        history.push("/login/")
        let logindata = {
          "username": username,
          "password": password
        }
        console.log(logindata)
        session.post('http://127.0.0.1:8000/api/login/',logindata)
        .then(res=>{
          console.log(res.data)
          
        })
        
      }
    })
    .catch(error=>{
      console.log("error.response")
      console.log(error.response)
      if(error.response.status === 500){
        console.log("uzytkownik juz istnieje")
        seterror("Użytkownik o takich danych już istnieje")
      }
      if(error.response.data){
        seterror("Popraw dane logowania")
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange = {(e)=>{setfirstname(e.target.value)}}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            {firstnameerror !== '' && firstnameerror}
            <Grid item xs={12} sm={6}>
              <TextField
                onChange = {(e)=>{setlastname(e.target.value)}}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            {lastnameerror !== '' && lastnameerror}
            <Grid item xs={12}>
              <TextField
                onChange = {(e)=>{setusername(e.target.value)}}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Nazwa użytkownika"
                name="username"
                // autoComplete="email"
              />
            </Grid>
            {usernameerror !== '' && usernameerror}
            <Grid item xs={12}>
              <TextField
                onChange = {(e)=>{setemail(e.target.value)}}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            {emailerror !== '' && emailerror}
            <Grid item xs={12}>
              <TextField
                onChange = {(e)=>{setpassword(e.target.value)}}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {passworderror !== '' && passworderror}
            <Grid item xs={12}>
              <TextField
                onChange = {(e)=>{setpassword1(e.target.value)}}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Powtórz hasło"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {password1error !== '' && password1error}
            {error !== '' && error}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleClick}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}