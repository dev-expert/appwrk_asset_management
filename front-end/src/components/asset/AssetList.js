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
import {GET_Assets,removeAsset,GET_Users,updateAssetStatus} from '../../queries/queries'
import AddNewAsset from '../asset/AddNewAsset';
import * as compose from 'lodash.flowright';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

class AssetList extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      newStatus:"",
      userId:""
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }
  displayAssets=()=>
    {
        var data=this.props.GET_Assets;
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
                  <TableCell align="right">{row.user.fullName}</TableCell>
                  <TableCell align="right">
                    <Button 
                      type="button"
                      variant="outlined"
                      color="primary"
                      onClick={(e)=>{this.changeStatus(e,row._id)}}
                      >

                      {row.status}
                  </Button>
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
                            onClick={(e)=>{this.removeAsset(e,row._id)}}
                            >
                           Remove Asset
                      </Button>
                    </TableCell>
                </TableRow>
              ))
        }
    }
    changeStatus=(e,assetId)=>
    {
      this.setState({
        openDialog: true,
        assetId:assetId
      });
    }
    removeAsset=(e,assetId)=>
    {
        this.props.removeAsset({
          variables:{
            assetId:assetId,
          },
          refetchQueries:[{query:GET_Assets}]
        });
    }
    
    handleCloseDialog() {
      this.setState({
        openDialog: false
      });
    }
    displayUsers=()=>
    {
        var data= this.props.GET_Users;
        if(data.loading)
        {
            return(<div>Loading categories....</div>)
        }
        else
        {
            return  data.users && data.users.map((row, index) => (
                         <MenuItem key={row._id} value={row._id}>{row.empId} / {row.fullName}</MenuItem>
            ))
                    
                   
                   
        }
        
    } 
    changeSelectUser=(e)=>{
        this.setState({
          userId:e.target.value
        })
    }
    
    updateStatus=(e)=>{
        this.props.updateAssetStatus({
          variables:{
            assetId:this.state.assetId,
            newStatus:this.state.newStatus,
            owner:this.state.userId

          },
          refetchQueries:[{query:GET_Assets}]
        });
        this.setState({
          newStatus:"",
            userId:"",
          openDialog: false
        });
    }

    render(){
        return(
            <>
            {/* <Button colored onClick={this.handleOpenDialog} raised ripple>Show Dialog</Button> */}
            <Dialog open={this.state.openDialog}>
               <DialogTitle>Change Asset Status</DialogTitle>
             <DialogContent>
             
                  <Grid item xs={12}>
                    <TextField
                        name="newStatus"
                        variant="outlined"
                        required
                        fullWidth
                        label="New Status"
                        value={this.state.newStatus}
                        onChange={(e)=>{this.setState({newStatus:e.target.value})}}
                    />
                  </Grid>
                  <br/>
                  <Grid item xs={12}>
                    <Select
                          value={this.state.userId}
                          fullWidth
                          required
                          input={<OutlinedInput onChange={(e)=>{this.changeSelectUser(e)}} name="userName" id="outlined-age-simple" />}
                          >
                            {this.displayUsers()}
                    </Select>
                  </Grid>
             
             </DialogContent>
              <DialogActions>
                <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
                <Button type='button' onClick={(e) => {this.updateStatus(e)}}>Update</Button>
            </DialogActions>
        </Dialog>
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
                {this.displayAssets()}
              </TableBody>
            </Table>
            
          </Paper>
           
            </>
          
        );
    }
}
export default compose(
  graphql(GET_Assets,{name:"GET_Assets"}),
  graphql(removeAsset,{name:"removeAsset"}),
  graphql(GET_Users,{name:"GET_Users"}),
  graphql(updateAssetStatus,{name:"updateAssetStatus"})
)(AssetList)
 
     


