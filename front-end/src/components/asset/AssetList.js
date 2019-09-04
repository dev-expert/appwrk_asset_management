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
import {GET_Assets} from '../../queries/queries'
import AddNewAsset from '../asset/AddNewAsset';

class ComponentList extends React.Component
{
    displayComponent=()=>
    {
        var data=this.props.data;
        if(data.loading)
        {
            return(<div>Loading Asset List....</div>)
        }
        else
        {
            return data.assets && data.assets.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.assetName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.component.componentName}
                  </TableCell>
                  <TableCell align="right">{row.component.category.categoryName}</TableCell>
                  <TableCell align="right">{row.serialNo}</TableCell>
                  <TableCell align="right">{row.manufacturer}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.expiryDate}</TableCell>
                  <TableCell align="right">{row.color}</TableCell>
                  <TableCell align="right">{row.purchaseDate}</TableCell>
                  <TableCell align="right">{row.owner}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
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
            <AddNewAsset/>
            <Typography component="h5" variant="h5" color="error">
                Asset List
            </Typography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Component Name</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Manufacturer</TableCell>  
                  <TableCell>Description</TableCell>
                  <TableCell>Expiry Date</TableCell> 
                  <TableCell>Color</TableCell>
                  <TableCell>Purchase Date</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Status</TableCell>
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
export default graphql(GET_Assets)(ComponentList); 
 
     


