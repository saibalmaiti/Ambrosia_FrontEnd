import React, { useEffect, useState } from "react";
import OrderItem from "../../user/helper/orderItem";
import { getUserName } from "./adminapicall";
import {isAuthenticated} from "../../auth/helper/index";
const AdminOrderList = (props) => {

    const[username, setUsername] = useState("");
    const retriveUserName = () =>{
        console.log(props.userId);
        const user = isAuthenticated();
        getUserName(props.userId, user.jwt).then((data)=>{
            if(typeof(data.data) !== "undefined"){
                setUsername(data.data.firstName + " " + data.data.lastName);
            }
            else{
                setUsername("Error in finding username")
            }
        })
    }
    useEffect(()=>{
        retriveUserName()
    }, []);
    return (
        <section className="ps-5 pe-5 mt-4">
            <div id="accordion">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">
                            <div>
                                Order Id: {props.orderId}
                            </div>
                            <div className="row">
                            <div className="col-sm" style={{ textAlign: "left" }}>
                                Orderd By {username}
                            </div>
                            <div className="col-sm" style={{ textAlign: "right" }}>
                                Status <p className={props.orderStatus === "SUCCESSFUL" ? "text-success" : props.orderStatus === "PROCESSING" ? "text-warning" : "text-danger"} >{props.orderStatus}</p>
                            </div>
                            </div>
                            
                        </h5>
                    </div>
                    <div >
                        <div className="card-body">
                            <ul className="list-group">
                                {props.orderItemList.map((item, index) => {
                                    return (<OrderItem
                                        key={index}
                                        name={item.item.name}
                                        quantity={item.quantity}
                                        price={item.price}
                                        src={item.item.imageFileName}
                                    />)
                                })}
                            </ul>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-6">Order Date:{new Date(Date.parse(props.createdAt)).toDateString()}</div>
                                <div className="col-sm-6" style={{ textAlign: "right" }}>Total Price: ₹ {props.totalPrice}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AdminOrderList;