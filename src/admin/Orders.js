import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders } from "./helper/adminapicall";
import Navigation from "../core/Navigation";
import AdminOrderList from "./helper/AdminOrderList";

const AdminOrders = () =>{
    const [orderList, setOrderList] = useState([]);
    const retriveAllOrders = () =>{
        const user = isAuthenticated();
        getAllOrders(user.jwt).then((data) => {
            console.log(data.data);
            setOrderList(data.data);
        }).catch(()=>console.log("Error while retriving data"))
    }
    useEffect(()=>{
        retriveAllOrders()
    }, []);
    return (
        <div style={{paddingBottom:"50px"}}>
            <Navigation />
            {orderList.map((item, index)=>{
                return(
                    <AdminOrderList
                        key = {index}
                        userId = {item.userId}
                        orderId = {item.orderId}
                        totalPrice = {item.totalPrice}
                        orderStatus = {item.orderStatus}
                        createdAt = {item.createdAt}
                        orderItemList = {item.orderItemList}
                    />
                    )
            })}
            
        </div>
    )
}

export default AdminOrders;