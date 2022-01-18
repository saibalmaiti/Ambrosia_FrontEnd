import React from "react";
import { Footer } from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import Navigation from "../core/Navigation";
import './helper/AdminMenu.css';

const ManageProducts = () =>{
    const user = isAuthenticated();
    return(
        <div>
            <Navigation/>
            <p>Current Menu</p>
            <Footer/>
        </div>
    )
}

export default ManageProducts;