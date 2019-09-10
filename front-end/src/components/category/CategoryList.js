import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { graphql } from 'react-apollo';
import AddNewCategory from './AddNewCategory';
import {GET_Categories,removeCategory,updateCategory} from '../../queries/queries';
import * as compose from 'lodash.flowright';
import NavBar from '../../navigation/NavBar';

class CategoryList extends React.Component
{
  constructor()
  {
      super();
      this.state={
        categoryId: null,
        categoryName: null
      }
  }
  displayCategory=()=>{
    
        var data=this.props.GET_Categories;
        if(data.loading)
        {
            return(<div>Loading Category List....</div>)
        }
        else
        {
              return data.categories && data.categories.map((row, index) => (
              
            <TableRow key={row._id}>
              <TableCell>{index+1}</TableCell>
              <TableCell component="th" scope="row">
                {row.categoryName}
              </TableCell>
              <TableCell align="right">{row.createdBy}</TableCell>
              <TableCell align="right">{row.modifiedBy}</TableCell>
              <TableCell align="right">{row.createdDate}</TableCell>
              <TableCell align="right">{row.modifiedDate}</TableCell>
              <TableCell align="right">
                  <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={(e)=>{this.editCategory(e,row._id,row.categoryName)}}
                        >
                      Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        onClick={(e)=>{this.delCategory(e,row._id)}}
                        >
                      Remove
                  </Button>
                </TableCell>
            </TableRow>
          ))
      }
  }
  editCategory=(e,catId,catName)=>{
   this.setState({
    categoryId: catId,
    categoryName: catName
   })
    // this.setState({
    //   categoryId:catId,
    //   categoryName:catName
    // })
    // this.props.updateCategory({
    //   variables:{
    //     catId:catId,

    //   },
    //   refetchQueries:[{query:GET_Categories}]
    // });
  }
  delCategory=(e,delId)=>
  {
    
      this.props.removeCategory({
        variables:{
          catId:delId,
        },
        refetchQueries:[{query:GET_Categories}]
      });
  }
 
  render(){
    return (
      <>
       <NavBar/>
      <AddNewCategory category={this.state}/>
      <Typography component="h5" variant="h5" color="error">
        Category List
      </Typography>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell>Category Name</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Modified By</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Modified Date</TableCell>
            <TableCell align="right">Action1</TableCell>
            <TableCell align="right">Action2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.displayCategory()}
        </TableBody>
      </Table>
      
    </Paper>
     
      </>
    )
  }
      
}

export default compose(
  graphql(GET_Categories,{name:"GET_Categories"}),
  graphql(removeCategory,{name:"removeCategory"}),
  graphql(updateCategory,{name:"updateCategory"})
)(CategoryList)


