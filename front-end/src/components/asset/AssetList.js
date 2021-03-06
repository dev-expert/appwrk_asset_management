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
import NavBar from '../../navigation/NavBar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';



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
                <TableRow className="tabel_body" key={row._id}>
                  <TableCell className="item">{index+1}</TableCell>
                  <TableCell  className="item" component="th" scope="row">
                    {row.assetName}
                  </TableCell>
                  <TableCell className="item" component="th" scope="row">
                    {row.component.componentName}
                  </TableCell>
                  <TableCell className="item">{row.component.category.categoryName}</TableCell>
                  <TableCell className="item">{row.serialNo}</TableCell>
                  <TableCell className="item">{row.manufacturer}</TableCell>
                  <TableCell className="item">{row.description}</TableCell>
                  <TableCell className="item">{row.expiryDate}</TableCell>
                  <TableCell className="item">{row.color}</TableCell>
                  <TableCell className="item">{row.purchaseDate}</TableCell>
                  <TableCell className="item">{row.user.fullName}</TableCell>
                  <TableCell className="item">
                    <Button 
                      type="button"
                      variant="outlined"
                      color="primary"
                      onClick={(e)=>{this.changeStatus(e,row._id)}}
                      >

                      {row.status}
                  </Button>
                  </TableCell>
                  <TableCell className="item">{row.createdBy}</TableCell>
                  <TableCell className="item">{row.modifiedBy}</TableCell>
                  <TableCell className="item">{row.createdDate}</TableCell>
                  <TableCell className="item">{row.modifiedDate}</TableCell>
                  <TableCell className="item">
                 <div style={{display: 'flex'}}>
                  <EditIcon                      
                        color="primary"
                        className="edit_icon"
                        onClick={(e)=>{this.editAsset(e,row._id,row.assetName,row.serialNo,row.manufacturer,row.description,row.expiryDate,row.color,row.purchaseDate)}}/>
                        
                        <DeleteForeverIcon  type="submit"
                        variant="outlined"
                        className="delete_icon"
                        color="secondary"
                        onClick={(e)=>{this.removeAsset(e,row._id)}}/>
                        </div> 
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
    editAsset(e,assetId,assetName,serialNo,manufacturer,description,expiryDate,color,purchaseDate)
    {
      
    }
    render(){
        return(
          <>
      <Grid container  justify="center"  >
      <Grid item className="container"    >
            <NavBar/>
            </Grid>
            <Grid item className="container"     >
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
            </Grid>
            <Grid item className="container user_tabel"   >
            <Typography component="h5" variant="h5" className="heading_text">
                Asset List
            </Typography>
          <Paper>
          <Table className="data">
        <TableHead className="data_head">
          <TableRow className="data_row">
                  <TableCell className="text">Sr. No.</TableCell>
                  <TableCell className="text">Asset Name</TableCell>
                  <TableCell className="text">Component Name</TableCell>
                  <TableCell className="text">Category Name</TableCell>
                  <TableCell className="text">Serial No.</TableCell>
                  <TableCell className="text">Manufacturer</TableCell>  
                  <TableCell className="text">Description</TableCell>
                  <TableCell className="text">Expiry Date</TableCell> 
                  <TableCell className="text">Color</TableCell>
                  <TableCell className="text">Purchase Date</TableCell>
                  <TableCell className="text">Owner</TableCell>
                  <TableCell className="text">Status</TableCell>
                  <TableCell className="text">Created By</TableCell>
                  <TableCell className="text">Modified By</TableCell>
                  <TableCell className="text">Created Date</TableCell>
                  <TableCell className="text">Modified Date</TableCell>
                  <TableCell className="text">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.displayAssets()}
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
  graphql(GET_Assets,{name:"GET_Assets"}),
  graphql(removeAsset,{name:"removeAsset"}),
  graphql(GET_Users,{name:"GET_Users"}),
  graphql(updateAssetStatus,{name:"updateAssetStatus"})
)(AssetList)
 
     


