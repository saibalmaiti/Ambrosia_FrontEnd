import React from "react";
import { CLOUDFRONT } from "../../backend";

const OrderItem = (props) =>{
    return(
        <li className="list-group-item">
            <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <img src={String(CLOUDFRONT)+props.src} alt="..." style={{height:"auto",width:"10rem"}}/>
                        </div>
                        <div className="col-sm">
                            {props.name}<br/>
                            Quantity: {props.quantity}
                        </div>
                        <div className="col-sm" style={{textAlign:"right"}}>
                            Price ₹{props.quantity*props.price}
                        </div>
                    </div>
                </div>
        </li>
    )
}

export default OrderItem;