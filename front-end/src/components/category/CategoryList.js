import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Query } from 'react-apollo';
import AddNewCategory from './AddNewCategory';
import {GET_Categories} from '../../queries/queries';


export default () => (
  
  <Query query={GET_Categories} >
    {({ loading, data,refetch }) => !loading && (
     
      <>
      <AddNewCategory/>
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
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.categories && data.categories.map((row, index) => (
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
                        color="secondary"
                        onClick={(e)=>{this.removeCategory(e)}}
                        >
                       Remove Category
                  </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </Paper>
     
      </>
    )}
  </Query>
);


