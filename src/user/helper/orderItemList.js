import React from "react";
import OrderItem from "./orderItem";
import { retryPayment } from "./userapicalls";

const OrderItemList = (props) => {
    const checkOut = (orderId, totalPrice) => {
        retryPayment((orderId), (totalPrice*100));
    }
    return (
        <section className="ps-5 pe-5 mt-4">
            <div id="accordion">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">
                            <div>
                                Order Id: {props.orderId}
                            </div>
                            <div style={{ textAlign: "right" }}>
                                Status: <p className={props.orderStatus === "SUCCESSFUL" ? "text-success" : props.orderStatus === "PROCESSING" ? "text-warning" : "text-danger"} >{props.orderStatus}</p>
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
                            {(props.orderStatus === "PROCESSING") && (<div style={{textAlign:"right"}}><button className="mt-2 btn btn-warning" onClick={()=>checkOut(props.razorpayOrderId, props.totalPrice)}>Retry Payment</button></div>)}
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
export default OrderItemList;