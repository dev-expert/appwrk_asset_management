import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {graphql} from 'react-apollo';
import {auth_Admin} from '../queries/queries';
import * as compose from 'lodash.flowright';
//import jwt from 'jsonwebtoken';
import './AdminLogin.css';
import assetImage from '../../src/images/logo.png';




class AdminLogin extends React.Component {

    constructor(props)
    {
      super(props);
      this.state={
        userName:"",
        password:""
      }
    }
    authUser = (e) =>{
      e.preventDefault();
      this.props.auth_Admin({
        variables:{
          userName:this.state.userName,
          password:this.state.password
        }
      }).then(res=>{
              // const verifyToken=jwt.verify(res.data.admin.token,'secretkey');
              // console.log(res)
               localStorage.setItem('admintoken', res.data.admin.token);
                this.props.history.push('/category');

      })

    }
  render(){
  return (
   
    <Grid  container component="main"  alignContent="center"   justify="center" className="login_body" >
    <Grid item >     
        <div align="center" >
          <img  src={assetImage} className="logo_img"  alt="Asset Management Logo"/>
        </div>
        <div className="login_form">
        <Typography component="h1" variant="h5" color="secondary" className="signin_text">
          Sign in
        </Typography>
        <form onSubmit={this.authUser.bind(this)}>        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            color="secondary"
            label="User Name"
            autoFocus
            value={this.state.userName}
            onChange={(e)=>{this.setState({userName:e.target.value})}}
            /> 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            autoFocus
            value={this.state.password}
            onChange={(e)=>{this.setState({password:e.target.value})}}
            />         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"  
            size="large"
            className="login_submit_btn"          
          >Sign In
          </Button>
       </form>
      </div>
      </Grid>      
      </Grid>  
    
  );
  }
}

export default compose(
  graphql(auth_Admin,{name:"auth_Admin"})
)(AdminLogin)
