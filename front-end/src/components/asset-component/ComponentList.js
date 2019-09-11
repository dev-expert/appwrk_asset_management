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
import AddNewComponent from './AddNewComponent';
import {GET_Components,removeComponent,updateComponent} from '../../queries/queries'
import * as compose from 'lodash.flowright';
import NavBar from '../../navigation/NavBar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import Grid from '@material-ui/core/Grid';




class ComponentList extends React.Component
{
    constructor()
    {
        super();
        this.state={
          compId: null,
          componentName: null,
          categoryId:null
        }
    }
    displayComponent=()=>
    {
        var data=this.props.GET_Components;
        if(data.loading)
        {
            return(<div>Loading Component List....</div>)
        }
        else
        {
            return data.components && data.components.map((row, index) => (
                <TableRow className="tabel_body" key={row._id}>
                  <TableCell className="item">{index+1}</TableCell>
                  <TableCell className="item" component="th" scope="row">
                    {row.componentName}
                  </TableCell>
                  <TableCell className="item" component="th" scope="row">
                    {row.category.categoryName}
                  </TableCell>
                  <TableCell className="item">{row.createdBy}</TableCell>
                  <TableCell className="item" >{row.modifiedBy}</TableCell>
                  <TableCell className="item">{row.createdDate}</TableCell>
                  <TableCell className="item">{row.modifiedDate}</TableCell>
                  <TableCell align="center">
                 <div style={{display: 'flex'}}>
                  <EditIcon                      
                        color="primary"
                        className="edit_icon"
                        onClick={(e)=>{this.editComponent(e,row._id,row.componentName,row.categoryId)}}/>
                        
                        <DeleteForeverIcon  type="submit"
                        variant="outlined"
                        className="delete_icon"
                        color="secondary"
                        onClick={(e)=>{this.removeComponent(e,row._id)}}/>
                        </div> 
                </TableCell>
                </TableRow>
              ))
        }
    }
    removeComponent=(e,compId)=>{
        this.props.removeComponent({
          variables:{
            componentId:compId,
          },
          refetchQueries:[{query:GET_Components}]
        });
    }
    editComponent=(e,compid,componentName,categoryId)=>
    {
        this.setState({
          compId: compid,
          componentName: componentName,
          categoryId:categoryId
        })
    }
    render(){
        return(
            <>
                               <Grid container  justify="center"  >
      <Grid item className="container"    >
            <NavBar/>
            </Grid>
            <Grid item className="container">
            <AddNewComponent components={this.state}/>
            </Grid>
            <Grid item className="container user_tabel"   >
            <Typography component="h5" variant="h5" className="heading_text">
                Component List
            </Typography>
          <Paper>
          <Table className="data">
        <TableHead className="data_head">
          <TableRow className="data_row">
                  <TableCell className="text">Serial No.</TableCell>
                  <TableCell className="text">Component Name</TableCell>
                  <TableCell className="text">Category Name</TableCell>
                  <TableCell className="text">Created By</TableCell>
                  <TableCell className="text">Modified By</TableCell>
                  <TableCell className="text">Created Date</TableCell>
                  <TableCell className="text">Modified Date</TableCell>
                  <TableCell className="text">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.displayComponent()}
              </TableBody>
            </Table>
            
          </Paper>
          </Grid>
          </Grid>
            </>
          
        );
    }
}
export default compose(
  graphql(GET_Components,{name:"GET_Components"}),
  graphql(removeComponent,{name:"removeComponent"}),
  graphql(updateComponent,{name:"updateComponent"})
)(ComponentList)
 
     


