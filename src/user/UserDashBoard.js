import React from "react";
import Base from "../core/Base";
import Navigation from "../core/Navigation";


const UserDashBoard = () =>{
    return(
        <div>
            <Navigation/>
            <Base title1="Welcome to" title2="Ambrosia">
                <h2>User Dashboard</h2>
            </Base>
        </div>
    )
}

export default UserDashBoard;