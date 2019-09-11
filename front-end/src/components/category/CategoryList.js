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
import Grid from '@material-ui/core/Grid';
import './Category.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

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
              
            <TableRow className="tabel_body" key={row._id}>
              <TableCell className="item">{index+1}</TableCell>
              <TableCell className="item" component="th" scope="row">
                {row.categoryName}
              </TableCell>
              <TableCell className="item" >{row.createdBy}</TableCell>
              <TableCell className="item" >{row.modifiedBy}</TableCell>
              <TableCell className="item" >{row.createdDate}</TableCell>
              <TableCell className="item" >{row.modifiedDate}</TableCell>
              <TableCell align="center">
                 <div style={{display: 'flex'}}>
                  <EditIcon                      
                        color="primary"
                        className="edit_icon"
                        onClick={(e)=>{this.editCategory(e,row._id,row.categoryName)}}/>
                        
                        <DeleteForeverIcon  type="submit"
                        variant="outlined"
                        className="delete_icon"
                        color="secondary"
                        onClick={(e)=>{this.delCategory(e,row._id)}}/>
                        </div> 
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
       <Grid container  justify="center"  >
      <Grid item className="container"    >
       <NavBar/>
       </Grid>
       <Grid item className="container"     >
      <AddNewCategory category={this.state}/>

      </Grid>
      <Grid item className="container user_tabel"   >
      <Typography className="heading_text" component="h5" variant="h5" >
        Category List
      </Typography>
    <Paper>
      <Table className="data">
        <TableHead className="data_head">
          <TableRow className="data_row">
            <TableCell className="text">Serial No.</TableCell>
            <TableCell className="text" >Category Name</TableCell>
            <TableCell className="text" >Created By</TableCell>
            <TableCell  className="text" >Modified By</TableCell>
            <TableCell className="text"  >Created Date</TableCell>
            <TableCell  className="text">Modified Date</TableCell>
            <TableCell className="text"  >Action</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody className="tabel_body">
          {this.displayCategory()}
        </TableBody>
      </Table>
      
    </Paper>
    </Grid>
     
      
           
      </Grid> 
      </>
    )
  }
      
}

export default compose(
  graphql(GET_Categories,{name:"GET_Categories"}),
  graphql(removeCategory,{name:"removeCategory"}),
  graphql(updateCategory,{name:"updateCategory"})
)(CategoryList)


