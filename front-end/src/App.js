import React from 'react';
import CategoryList from './components/category/CategoryList';
import ComponentList from './components/asset-component/ComponentList';
import NavBar from './navigation/NavBar';
import {BrowserRouter,Route} from 'react-router-dom';
import AssetList from './components/asset/AssetList';
import UserList from './components/users/UserList';
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
           <Route exact path="/" component={AdminLogin}/>
          <Route path="/category" component={CategoryList}/>
          <Route path="/component" component={ComponentList}/>
          <Route path="/asset" component={AssetList}/>
          <Route path="/users" component={UserList}/>
      </BrowserRouter>
      
   
    </>
  );
}

export default App;
