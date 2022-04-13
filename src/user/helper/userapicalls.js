import axios from "axios";
import { API } from "../../backend";
import context from "../../context/context";


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