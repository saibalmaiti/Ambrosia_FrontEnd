import axios from 'axios';
import { API } from '../../backend';
import { CLOUDFRONT } from "../../backend";
import { isAuthenticated } from '../../auth/helper';

const createOrderJSON = (data, userId) => {
    var totalPrice = 0.0;
    var itemList = [];
    data.map((item, index) => {
        const product = {
            "itemId": item.itemId,
            "name": item.name,
            "description": item.description,
            "price": item.price,
            "imageFileName": item.imageFileName,
            "isVeg": item.isVeg,
            "isActive": item.isActive,
            "category": item.category
        };
        const itemListElement = { "item": product, "quantity": item.Quantity, "price": parseFloat(parseInt(item.Quantity) * parseFloat(item.price)) };
        totalPrice += parseFloat(parseInt(item.Quantity) * parseFloat(item.price));
        itemList.push(itemListElement);
    }
    )
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const ObjectData = { "userId": userId, "totalPrice": totalPrice, "createdAt": timestamp, "itemList": itemList }
    const JSONObject = JSON.stringify(ObjectData);

    return JSONObject;

}


export const placeOrder = (data, userId, jwt) => {
    const JSONdata = createOrderJSON(data, userId);
    let bearer = "Bearer " + jwt;
    return axios({
        method: 'post',
        url: String(API) + 'order/create-order',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        data: JSONdata
    }).then(response => {

        //On successful order Creation
        const recivedData = response.data;
        console.log(recivedData.totalPrice);
        var options = {
            "key": "rzp_test_tTuC4iOvszA1xK", // Enter the Key ID generated from the Dashboard
            "amount": recivedData.totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "",
            "description": "",
            "image": CLOUDFRONT + "banner/icon.png",
            "order_id": recivedData.razorpayOrderId,
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
                console.log(data);
                console.log(jwt);
                addPaymentDetails(data, jwt);
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
        return (response)
    })
        .catch(error => {
            return error;
        })
}

export const addPaymentDetails = (data, jwt) =>{
    const bearer = "Bearer " + jwt;
    return axios({
        "method" : "POST",
        url: String(API) + 'order/add-payment-details',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => console.log(error))
}

export const updatePaymentStatus = (data, jwt) => {
    const bearer = "Bearer " + jwt;
    axios({
        "method" : "POST",
        url: String(API) + 'order/update-order-status',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => console.log(error))
}

