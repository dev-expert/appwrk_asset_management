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
import {GET_Components} from '../../queries/queries'

class ComponentList extends React.Component
{
    displayComponent=()=>
    {
        var data=this.props.data;
        if(data.loading)
        {
            return(<div>Loading Component List....</div>)
        }
        else
        {
            return data.components && data.components.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.componentName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.category.categoryName}
                  </TableCell>
                  <TableCell align="right">{row.createdBy}</TableCell>
                  <TableCell align="right">{row.modifiedBy}</TableCell>
                  <TableCell align="right">{row.createdDate}</TableCell>
                  <TableCell align="right">{row.modifiedDate}</TableCell>
                  <TableCell align="right">
                      <Button
                            type="submit"
                            variant="outlined"
                            color="secondary"
                            onClick={(e)=>{this.removeCategory(e)}}
                            >
                           Remove Component
                      </Button>
                    </TableCell>
                </TableRow>
              ))
        }
    }
    render(){
        return(
            <>
            <AddNewComponent/>
            <Typography component="h5" variant="h5" color="error">
                Component List
            </Typography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Component Name</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell align="right">Created By</TableCell>
                  <TableCell align="right">Modified By</TableCell>
                  <TableCell align="right">Created Date</TableCell>
                  <TableCell align="right">Modified Date</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.displayComponent()}
              </TableBody>
            </Table>
            
          </Paper>
           
            </>
          
        );
    }
}
export default graphql(GET_Components)(ComponentList); 
 
     


