import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import TextField from '@material-ui/core/TextField';
import {addCategoryMutation, GET_Categories,updateCategory} from '../../queries/queries';


class AddNewCategory extends React.Component
{
    constructor()
    {
        super();
        this.state={
            categoryName:"",
            createdBy:"AppWrk",
            modifiedBy:"AppWrk",
            createdDate:"",
            modifiedDate:"",
            message:"",
            catId:"",
            catButtonText:"Add Category",
            isUpdate:false
        }
    } 
    changeCategory=(e)=>{
        const date=Date().toString();
        this.setState({
           categoryName:e.target.value,
           createdDate:date,
            modifiedDate:date
        })
    }
    submitCategory=(e)=>
    {
        e.preventDefault();
        if(this.state.catId)
        {
            this.props.updateCategory({
                   variables:{
                     catId:this.state.catId,
                     categoryName:this.state.categoryName
            
               },
             refetchQueries:[{query:GET_Categories}]
                 });
            this.props.category.categoryId="";
            this.props.category.categoryName=""; 
            this.setState({
                catId:"",
                catButtonText:"Add Category",
                categoryName:"",
                isUpdate:true,
                message:"Category Updated Successfully"
            });
        }
        else
        {
            if(!this.state.categoryName)
            {
                this.setState({
                    message:"Category Name can't be blank!"
                })
                return
            }

            this.props.addCategoryMutation({
                variables:{
                    categoryName:this.state.categoryName,
                    createdBy:this.state.createdBy,
                    modifiedBy:this.state.modifiedBy,
                    createdDate:this.state.createdDate,
                    modifiedDate:this.state.modifiedDate
                },
                refetchQueries:[{query:GET_Categories}]
            }).then(()=>{
                this.setState({
                    categoryName:"",
                    message:"New Category Submitted Successfully"
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
    componentWillReceiveProps(newProps)
    {
      if(newProps.category.categoryId)
      {
        this.setState({
           
            categoryName:newProps.category.categoryName,
            catId:newProps.category.categoryId,
            catButtonText:"Update Category",
            
        })
      }
     
    }

    render(){
        
        return(
            <Container component="main" maxWidth="sm">
                <div>
                    <Typography component="h1" variant="h5" color="error">
                        Add New Category
                    </Typography>
                    <form onSubmit={this.submitCategory.bind(this)}>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Category Name"
                        name="category_name"
                        autoFocus
                        value={this.state.categoryName}
                        onChange={(e)=>{this.changeCategory(e)}}
                        onClick={(e)=>{this.removeMessage(e)}}
                        />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        
                    >
                      {this.state.catButtonText}
                    </Button>

                </form>

                </div>
                <Typography component="h1" variant="h5" style={{color:'green'}}>{this.state.message}</Typography>
         </Container>
        )
    }
}
export default compose(
    graphql(addCategoryMutation,{name:"addCategoryMutation"}),
    graphql(updateCategory,{name:"updateCategory"})
)(AddNewCategory)
