import React from "react";
import { CLOUDFRONT } from "../../backend";

const CartItem = (props) =>{
    return(
        <li>
            <div className="dropdown-item" style={{width:"30rem"}}>
            <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <img src={String(CLOUDFRONT)+props.src} alt="..." style={{height:"auto",width:"10rem"}}/>
                        </div>
                        <div className="col-sm">
                            {props.name}<br/>
                            Quantity:{props.quantity}
                        </div>
                        <div className="col-sm">
                            Price: ₹{props.quantity*props.price}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartItem;