import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./core/Home";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import { isAuthenticated } from "./auth/helper";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact  render=
          {() =>{return(isAuthenticated()?isAuthenticated().appUserRole === "ADMIN"?
          <Redirect to="/admin/dashboard" />:<Redirect to="/user/dashboard"/>:
          <Redirect to="/home"/>)}} />
        <Route path="/home" exact component={Home}/>
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
        <AdminRoute path="/admin/menu/additem" exact component={AddProduct}/>
        <AdminRoute path="/admin/menu/edititem" exact component={ManageProducts}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
