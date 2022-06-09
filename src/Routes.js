import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./core/Home";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import About from "./core/about";
import { isAuthenticated } from "./auth/helper";
import Orders from "./user/orders";
import AdminOrders from "./admin/Orders";


const Routes = () => {
  //for razorpay
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact  render=
          {() =>{return(isAuthenticated()?isAuthenticated().appUserRole === "ADMIN"?
          <Redirect to="/admin/dashboard" />:<Redirect to="/user/dashboard"/>:
          <Redirect to="/home"/>)}} />
        <Route path="/home" exact component={Home}/>
        <Route path="/about" exact component={About}/>
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
        <PrivateRoute path="/user/orders" exact component={Orders}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
        <AdminRoute path="/admin/menu/additem" exact component={AddProduct}/>
        <AdminRoute path="/admin/menu/edititem" exact component={ManageProducts}/>
        <AdminRoute path="/admin/orders" exact component={AdminOrders}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
