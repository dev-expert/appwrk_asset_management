import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {graphql} from 'react-apollo';
import {auth_Admin} from '../queries/queries';
import * as compose from 'lodash.flowright';
//import jwt from 'jsonwebtoken';

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

      }).catch(()=>{
        alert('Invalid Login Credentials!');
      })

    }
  render(){
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        
        <Typography component="h1" variant="h5" color="error">
          Sign in
        </Typography>
        <form onSubmit={this.authUser.bind(this)}>
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
            value={this.state.password}
            onChange={(e)=>{this.setState({password:e.target.value})}}
            /> 
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Sign In
          </Button>


       </form>
      </div>
    </Container>
  );
  }
}

export default compose(
  graphql(auth_Admin,{name:"auth_Admin"})
)(AdminLogin)
