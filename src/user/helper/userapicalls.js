import axios from "axios";
import { API } from "../../backend";
import { CLOUDFRONT } from "../../backend";
import { isAuthenticated } from "../../auth/helper";
import { updatePaymentStatus, addPaymentDetails } from "../../core/helper/coreapicalls";


export const getActiveItem = (jwt) =>{
    const bearer = "Bearer "+jwt;
    return axios({
        method: 'get',
        url: String(API) + 'menu/get-all-active-items',
        headers: {
            'Authorization': bearer
        }
    }).then(response=>{
        return response.data
    }).catch(error=>{
        console.log(error.response.data);
    })
}

export const addToCart = (context,item) =>{
    item.Quantity = 1;
    context.setCartItem(item);

}
export const increaseQuantity = (context,id) =>{
    const index = context.cartData.findIndex(function(array) {
        return array.itemId === id;
    });
    // console.log("Index while increasing the item"+index);
    const item = context.cartData[index];
    context.cartData.splice(index,1);
    item.Quantity +=1;
    context.setCartItem(item);
}
export const decreaseQuantity = (context,id) =>{

    const index = context.cartData.findIndex(function(array) {
        return array.itemId === id;
    });
    // console.log("Index While deleting the item"+index);
    const item = context.cartData[index];
    if(context.cartData[index].Quantity === 1){
        context.setCart(context.cartData.filter(singleItem => singleItem.itemId !== item.itemId));
    }
    else{
        const item = context.cartData[index];
        context.cartData.splice(index,1);
        item.Quantity -= 1;
        context.setCartItem(item);
    }
}
export const getAllOrders = (userId, jwt) => {
    let bearer = "Bearer " + jwt;
    return axios({
        method: "GET",
        url: String(API) + "order/get-order-by-userid?userid=" + userId,
        headers: {
            'Authorization': bearer
        }
    }).then( response => {
        return response;
    })
    .catch(error => {
        return error;
    })
}

export const retryPayment = (orederId, amount) => {
    // console.log(orederId);
    // console.log(amount);
    const data = {
        "razorpayOrderId": orederId,
        "totalPrice": amount
    };
    var r = JSON.parse(JSON.stringify(data));
    // console.log(r.totalPrice);
    var options = {
        "key": "rzp_test_tTuC4iOvszA1xK", // Enter the Key ID generated from the Dashboard
        "amount": r.totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "",
        "description": "",
        "image": CLOUDFRONT + "banner/icon.png",
        "order_id": r.razorpayOrderId,
        "handler": function (response) {
            alert("Payment Done Successfully");
            const data = {
                "paymentId": response.razorpay_payment_id,
                "signature": response.razorpay_signature,
                "razorpayOrderId" : response.razorpay_order_id
            }
            const user = isAuthenticated();
            const jwt = user.jwt
            console.log("Payment Success Data:");
            // console.log(data);
            // console.log(jwt);
            addPaymentDetails(data, jwt).then(()=>{
                window.location.reload(true);
            });
            
        },
        "prefill": {
            "name": "",
            "email": "",
            "contact": ""
        },
        "notes": {
            "address": ""
        },
        "theme": {
            "color": "#FAEDF0"
        }
    };
    const paymentObject = new window.Razorpay(options);
    //on payment fail
    paymentObject.on('payment.failed', function (response){
        const user = isAuthenticated();
        const jwt = user.jwt
        const data = {
            "razorpayOrderId" : response.error.order_id,
            "status": "FAILED"
        }
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
        updatePaymentStatus(data, jwt);
    });
    paymentObject.open();
}