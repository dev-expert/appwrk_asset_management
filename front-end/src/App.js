import React from 'react';
import CategoryList from './components/category/CategoryList';
import ComponentList from './components/asset-component/ComponentList';
import NavBar from './navigation/NavBar';
import {BrowserRouter,Route} from 'react-router-dom';
import AssetList from './components/asset/AssetList';
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
           <Route exact path="/" component={CategoryList}/>
          <Route path="/category" component={CategoryList}/>
          <Route path="/component" component={ComponentList}/>
          <Route path="/asset" component={AssetList}/>
      </BrowserRouter>
      
   
    </>
  );
}

export default App;
