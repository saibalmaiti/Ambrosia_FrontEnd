import axios from "axios";
import { API } from "../../backend";

export const getItemCategory = (jwt) =>{
    const bearer = "Bearer "+jwt;
    return axios({
        method: 'get',
        url: String(API) + 'menu/get-all-item-categories',
        headers: {
            "Authorization":bearer
        }
    })
    .then(response =>{
        // console.log(response.data);
        return response.data;
    })
    .catch(error =>{
        console.log(error);
    })
}

export const addItemtoDB = (item,jwt) =>{
    const bearer = "Bearer "+jwt;
    console.log(item)
    // let itemDetails = new FormData();
    // itemDetails.append("name",item.name)
    // itemDetails.append("description",item.description)
    // itemDetails.append("price",item.price)
    // itemDetails.append("isVeg",item.isVeg)
    // itemDetails.append("category",item.category)
    // console.log(itemDetails);
    let itemDetails = {
        "name":item.prodname,
        "description":item.description,
        "price":item.price,
        "isVeg":item.isVeg,
        "category":item.category
    }
    console.log(JSON.stringify(itemDetails));
    let itemData = new FormData();
    itemData.append("file",item.file);
    itemData.append("item", JSON.stringify(itemDetails));
    
    return axios({
        method: 'post',
        url: String(API) + 'menu/add-item',
        headers: {
            "Authorization":bearer,
            "Content-Type":"multipart/form-data"
        },
        data:itemData
    }).then(response=>{
        console.log("sucessfully added",response);
        return response;
    }).catch(error=>{
        console.log(error.response.data);
        return error;
    });
}