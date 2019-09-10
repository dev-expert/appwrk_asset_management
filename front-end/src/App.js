import React from 'react';
import CategoryList from './components/category/CategoryList';
import ComponentList from './components/asset-component/ComponentList';
import {BrowserRouter,Route} from 'react-router-dom';
import AssetList from './components/asset/AssetList';
import UserList from './components/users/UserList';
import AdminLogin from "./components/AdminLogin";
import {  Redirect } from 'react-router-dom';

function App(props) {
  return (
    <>
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
      
   
    </>
  );
}

export default App;
