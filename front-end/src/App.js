import React from 'react';
import CategoryList from './components/category/CategoryList';
import ComponentList from './components/asset-component/ComponentList';
import {BrowserRouter,Route} from 'react-router-dom';
import AssetList from './components/asset/AssetList';
import UserList from './components/users/UserList';
import AdminLogin from "./components/AdminLogin";
import {  Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import 'typeface-poppins';
import './App.css';


const theme = createMuiTheme({
  palette: {
    primary:{main:'#0f58a5'},
    secondary: { main: '#eb5526' },     
  },
});

function App(props) {
  return (
    <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Route exact path="/" component={AdminLogin}/>
          <Route path="/category" component={()=>
            !localStorage.getItem('admintoken') ? <Redirect to={{ pathname: '/' }} /> : <CategoryList history={props.history}/>
            
            }/>
          <Route path="/component" component={()=>
            !localStorage.getItem('admintoken') ? <Redirect to={{ pathname: '/' }} /> : <ComponentList history={props.history}/>
            }/>
          <Route path="/asset" component={()=>
            !localStorage.getItem('admintoken') ? <Redirect to={{ pathname: '/' }} /> : <AssetList history={props.history}/>
            }/>
          <Route path="/users" component={()=>
            !localStorage.getItem('admintoken') ? <Redirect to={{ pathname: '/' }} /> : <UserList history={props.history}/>
            }/>

            <Route path="/logout" component={()=>{
              return( <>
               {localStorage.removeItem("admintoken")}
               <Redirect to={{ pathname: '/' }} />
                </>
              )
            }} />
      </BrowserRouter>
      </ThemeProvider>   
    </>
  );
}

export default App;
