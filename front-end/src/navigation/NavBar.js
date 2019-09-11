import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import {Link} from 'react-router-dom';
import './navbar.css';
function NavBar() {
   
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
              <Grid  container component="main"       >
    <Grid item className="navbar_btn" > 

          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" {...bindTrigger(popupState)}>
              DashBoard
            </Button>
          </Link>

         <Link to="/category" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" {...bindTrigger(popupState)}>
              Category
            </Button>
          </Link>
          
          {/* <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}></MenuItem>
            <MenuItem onClick={popupState.close}>Death</MenuItem>
          </Menu> */}

          <Link to="/component" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" {...bindTrigger(popupState)}>
              Component
            </Button>
          </Link>

          <Link to="/users" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" {...bindTrigger(popupState)}>
              Users
            </Button>
          </Link>

          <Link to="/asset" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" {...bindTrigger(popupState)}>
              Asset
            </Button>
          </Link>
          <Link to="/logout" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary" {...bindTrigger(popupState)}>
            Logout
          </Button>
        </Link>
        </Grid>
        </Grid>


        </React.Fragment>
      )}
    </PopupState>
  );
        
}

export default NavBar;
