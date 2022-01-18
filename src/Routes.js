import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
        <AdminRoute path="/admin/menu/additem" exact component={AddProduct}/>
        <AdminRoute path="/admin/menu/edititem" exact component={ManageProducts}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
