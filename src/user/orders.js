import React, { useEffect, useState } from "react";
import Provider from "../context/provider";
import Navigation from "../core/Navigation";
import OrderItemList from "./helper/orderItemList";
import { getAllOrders } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";


const Orders = () => {
    const [orderList, setOrderList] = useState([]);
    const retriveOrderData = () =>{
        const user = isAuthenticated();
        getAllOrders(user.appUserId, user.jwt).then((data) => {
            // console.log(data.data);
            setOrderList(data.data);
        }).catch(()=>console.log("Error while retriving data"))
    }
    useEffect(()=>{
        retriveOrderData()
    }, []);

    return (<Provider>
        <div style={{paddingBottom:"50px"}}>
            <Navigation />
            {orderList.map((item, index)=>{
                return(
                    <OrderItemList
                        key = {index}
                        orderId = {item.orderId}
                        totalPrice = {item.totalPrice}
                        orderStatus = {item.orderStatus}
                        createdAt = {item.createdAt}
                        orderItemList = {item.orderItemList}
                        razorpayOrderId = {item.razorpayOrderId}
                    />
                    )
            })}
            
        </div>
    </Provider>)
}

export default Orders;