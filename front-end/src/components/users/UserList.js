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
import {GET_Users,removeUser} from '../../queries/queries'
import AddNewUser from '../users/AddNewUser';
import * as compose from 'lodash.flowright';
import NavBar from '../../navigation/NavBar';
import Grid from '@material-ui/core/Grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

class ComponentList extends React.Component
{
    constructor()
    {
      super();
      this.state={
        userId:null,
        empId:null,
        fullName:null,
        designation:null
      }
    }
    displayUsers=()=>
    {
        var data=this.props.GET_Users;
        if(data.loading)
        {
            return(<div>Loading Users List....</div>)
        }
        else
        {
            return data.users && data.users.map((row, index) => (
                <TableRow className="tabel_body" key={row._id}>
                  <TableCell className="item" >{index+1}</TableCell>
                  <TableCell className="item" component="th" scope="row">
                    {row.empId}
                  </TableCell>
                  <TableCell className="item"  component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell className="item" component="th" scope="row">
                    {row.designation}
                  </TableCell>
                  <TableCell className="item">{row.createdBy}</TableCell>
                  <TableCell className="item">{row.modifiedBy}</TableCell>
                  <TableCell className="item">{row.createdDate}</TableCell>
                  <TableCell className="item">{row.modifiedDate}</TableCell>
                  <TableCell align="center">                      
                      <div style={{display: 'flex'}}>
                  <EditIcon                      
                        color="primary"
                        className="edit_icon"
                        onClick={(e)=>{this.editUser(e,row._id,row.empId,row.fullName,row.designation)}}/>
                        
                        <DeleteForeverIcon  type="submit"
                        variant="outlined"
                        className="delete_icon"
                        color="secondary"
                        onClick={(e)=>{this.removeUser(e,row._id)}}/>
                        </div> 


                    </TableCell>
                </TableRow>
              ))
        }
    }
    removeUser=(e,userId)=>
    {
      this.props.removeUser({
        variables:{
          userId:userId,
        },
        refetchQueries:[{query:GET_Users}]
      });
    }
    editUser(e,userId,empId,fullName,designation)
    {
      this.setState({
        userId: userId,
        empId: empId,
        fullName:fullName,
        designation:designation
       })
    }
    render(){
        return(
            <>
                   <Grid container  justify="center"  >
      <Grid item className="container"    >
            <NavBar/>
            </Grid>
            <Grid item className="container"     >
           <AddNewUser user={this.state}/>
           </Grid>
           <Grid item className="container user_tabel"   >
            <Typography className="heading_text" component="h5" variant="h5" >
                Users List
            </Typography>
          <Paper>
          <Table className="data">
        <TableHead className="data_head">
          <TableRow className="data_row">
                  <TableCell className="text">Serial No.</TableCell>
                  <TableCell className="text">Employee ID</TableCell>
                  <TableCell className="text">Full Name</TableCell>
                  <TableCell className="text">Designation</TableCell>
                  <TableCell className="text" >Created By</TableCell>
                  <TableCell className="text">Modified By</TableCell>
                  <TableCell className="text">Created Date</TableCell>
                  <TableCell className="text">Modified Date</TableCell>
                  <TableCell className="text">Action1</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {this.displayUsers()}
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
  graphql(GET_Users,{name:"GET_Users"}),
  graphql(removeUser,{name:"removeUser"})
)(ComponentList)
  
     


