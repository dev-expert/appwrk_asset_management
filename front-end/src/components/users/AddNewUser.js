import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {graphql} from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import {GET_Users,addUserMutation} from '../../queries/queries';
import * as compose from 'lodash.flowright';

class AddNewUser extends React.Component
{
    constructor(props)
    {
        const date=Date().toString();
        super(props);
        this.state={
            empId:"",
            fullName:"",
            designation:"",
            createdBy:"AppWrk",
            modifiedBy:"AppWrk",
            createdDate:date,
            modifiedDate:date,
            message:""
        }
    } 
    
    submitUser=(e)=>
    {
        e.preventDefault();
        console.log(this.props);
        this.props.addUserMutation({
            variables:{
                empId:this.state.empId,
                fullName:this.state.fullName,
                designation:this.state.designation,
                createdBy:this.state.createdBy,
                modifiedBy:this.state.modifiedBy,
                createdDate:this.state.createdDate,
                modifiedDate:this.state.modifiedDate,
            },
         refetchQueries:[{query:GET_Users}]
        });
        this.setState({
            empId:"",
            fullName:"",
            designation:"",
            message:"New User Added Successfully."

        })

    } 
  
    removeMessage=(e)=>{
        this.setState({
            message:""
        });
    } 
   
    render(){
        return(
            <Container component="main" maxWidth="sm">
                
                <div>
                    <Typography component="h1" variant="h5" color="error">
                        Add New User
                    </Typography>
                    <form onSubmit={this.submitUser.bind(this)}>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Employee ID"
                        autoFocus
                        value={this.state.empId}
                        onChange={(e)=>{this.setState({empId:e.target.value})}}
                        onClick={(e)=>{this.removeMessage(e)}}
                        />
                        
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Full Name"
                        autoFocus
                        value={this.state.fullName}
                        onChange={(e)=>{this.setState({fullName:e.target.value})}}
                        onClick={(e)=>{this.removeMessage(e)}}
                        />  

                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Designation"
                        autoFocus
                        value={this.state.designation}
                        onChange={(e)=>{this.setState({designation:e.target.value})}}
                        onClick={(e)=>{this.removeMessage(e)}}
                        />  

                    <br/><br/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                       Add User
                    </Button>

                </form>

                </div>
                <Typography component="h1" variant="h5" style={{color:'green'}}>{this.state.message}</Typography>
         </Container>
        )
    }
}
export default compose(
    graphql(addUserMutation,{name:"addUserMutation"})
)(AddNewUser)
