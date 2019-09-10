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
                <TableRow key={row._id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.empId}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.designation}
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
                            onClick={(e)=>{this.editUser(e,row._id,row.empId,row.fullName,row.designation)}}
                            >
                           Edit 
                      </Button>
                    </TableCell>
                    <TableCell align="right">  
                      <Button
                            type="submit"
                            variant="outlined"
                            color="secondary"
                            onClick={(e)=>{this.removeUser(e,row._id)}}
                            >
                           Remove 
                      </Button>
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
            <NavBar/>
           <AddNewUser user={this.state}/>
            <Typography component="h5" variant="h5" color="error">
                Users List
            </Typography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell align="right">Created By</TableCell>
                  <TableCell align="right">Modified By</TableCell>
                  <TableCell align="right">Created Date</TableCell>
                  <TableCell align="right">Modified Date</TableCell>
                  <TableCell align="right">Action1</TableCell>
                  <TableCell align="right">Action2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.displayUsers()}
              </TableBody>
            </Table>
            
          </Paper>
           
            </>
          
        );
    }
}
export default compose(
  graphql(GET_Users,{name:"GET_Users"}),
  graphql(removeUser,{name:"removeUser"})
)(ComponentList)
  
     


