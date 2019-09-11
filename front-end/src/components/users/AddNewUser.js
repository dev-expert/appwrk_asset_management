import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {graphql} from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import {GET_Users,addUserMutation,updateUser} from '../../queries/queries';
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
            message:"",
            ButtonText:"Add User",
            userId:null
        }
    } 
    componentWillReceiveProps(newProps)
    {
      if(newProps.user.userId)
      {
        this.setState({
           
            empId:newProps.user.empId,
            fullName:newProps.user.fullName,
            designation:newProps.user.designation,
            ButtonText:"Update User",
            userId:newProps.user.userId
            
        })
      }
     
    }
    submitUser=(e)=>
    {
        e.preventDefault();
        if(this.state.userId)
        {
            this.props.updateUser({
                   variables:{
                    userId:this.state.userId,
                    empId:this.state.empId,
                    fullName:this.state.fullName,
                    designation:this.state.designation
            
               },
             refetchQueries:[{query:GET_Users}]
                 });
            this.props.user.userId="";
            this.props.user.empId="";
            this.props.user.fullName="";
            this.props.user.designation="";
            
            this.setState({
                userId:"",
                ButtonText:"Add User",
                empId:"",
                fullName:"",
                designation:"",
                message:"User Updated Successfully"
            });
        }
        else
        {
            if(!this.state.empId || !this.state.fullName || !this.state.designation)
            {
                this.setState({
                    message:"All fields are required!"
                })
                return
            }
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
            }).then(()=>{
                this.setState({
                    empId:"",
                    fullName:"",
                    designation:"",
                    message:"New User Added Successfully."
    
                })
            }).catch(()=>{
                this.setState({
                    message:"Something went wrong!"
                })
            })
            
        }

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
                      {this.state.ButtonText}
                    </Button>

                </form>

                </div>
                <Typography component="h1" variant="h5" style={{color:'green'}}>{this.state.message}</Typography>
         </Container>
        )
    }
}
export default compose(
    graphql(addUserMutation,{name:"addUserMutation"}),
    graphql(updateUser,{name:"updateUser"})
)(AddNewUser)
