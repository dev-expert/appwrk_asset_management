import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {GET_Categories,addComponentMutation,GET_Components,updateComponent} from '../../queries/queries';


class AddNewCategory extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            componentName:"",
            categoryId:"",
            createdBy:"AppWrk",
            modifiedBy:"AppWrk",
            createdDate:"",
            modifiedDate:"",
            message:"",
            catValue:"",
            compId:"",
            ButtonText:"Add Component"
        }
    } 
    changeComponent=(e)=>{
        const date=Date().toString();
        this.setState({
            componentName:e.target.value,
            createdDate:date,
            modifiedDate:date
        })
    }
    submitComponent=(e)=>
    {
        e.preventDefault();
        if(this.state.compId)
        {
            this.props.updateComponent({
                variables:{
                    comId:this.state.compId,
                    componentName:this.state.componentName,
                    categoryId:this.state.categoryId
         
            },
          refetchQueries:[{query:GET_Components}]
              });
         this.props.components.compId="";
         this.props.components.componentName=""; 
         this.setState({
             compId:"",
             ButtonText:"Add Component",
             componentName:"",
             message:"Component Updated Successfully"
         });
        }
        else
        {
            if(!this.state.componentName || !this.state.categoryId)
            {
                this.setState({
                    message:"Component & Category Name can't be blank!"
                })
                return
            }

            this.props.addComponentMutation({
                variables:{
                    componentName:this.state.componentName,
                    createdBy:this.state.createdBy,
                    modifiedBy:this.state.modifiedBy,
                    createdDate:this.state.createdDate,
                    modifiedDate:this.state.modifiedDate,
                    categoryId:this.state.categoryId
                },
                refetchQueries:[{query:GET_Components}]
            }).then(()=>{
                this.setState({
                    componentName:"",
                    catValue:"",
                    message:"New Component Added Successfully."
        
                })
            }).catch(()=>{
                this.setState({
                    message:"Something went wrong!"
                })
            });
            
        }
        

    } 
    removeMessage=(e)=>{
        this.setState({
            message:""
        });
    }
    displayCategories=()=>
    {
        var data= this.props.GET_Categories;
        if(data.loading)
        {
            return(<div>Loading categories....</div>)
        }
        else
        {
            return  data.categories && data.categories.map((row, index) => (
                         <MenuItem key={row._id} value={row._id}>{row.categoryName}</MenuItem>
            ))
                    
                   
                   
        }
        
    } 
    changeSelectCategory=(e)=>{
       this.setState({
          categoryId:e.target.value,
           catValue:e.target.value
       })
    }
    componentWillReceiveProps(newProps)
    {
      if(newProps.components.compId)
      {
        this.setState({
           
            componentName:newProps.components.componentName,
            categoryId:newProps.components.categoryId,
            compId:newProps.components.compId,
            ButtonText:"Update Component",
            
        })
      }
     
    }
    render(){
        return(
            <Container component="main" maxWidth="sm">
                
                <div>
                    <Typography component="h1" variant="h5" color="error">
                        Add New Component
                    </Typography>
                    <form onSubmit={this.submitComponent.bind(this)}>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Component Name"
                        autoFocus
                        value={this.state.componentName}
                        onChange={(e)=>{this.changeComponent(e)}}
                        onClick={(e)=>{this.removeMessage(e)}}
                        />
                         <Select
                          value={this.state.catValue}
                          fullWidth
                          required
                           input={<OutlinedInput name="category_name" onChange={(e)=>{this.changeSelectCategory(e)}} id="outlined-age-simple" />}
                            >
                           
                           {this.displayCategories()}
                        </Select>
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
    graphql(addComponentMutation,{name:"addComponentMutation"}),
    graphql(GET_Categories,{name:"GET_Categories"}),
    graphql(updateComponent,{name:"updateComponent"})
)(AddNewCategory)
