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

export const addnewCategory = (category,jwt) =>{
    const bearer = "Bearer "+jwt;
    let newCategory = new FormData();
    newCategory.append("category", category);
    return axios({
        method:'post',
        url: String(API) + 'menu/add-new-category',
        headers:{
            "Authorization":bearer,
            "Content-Type":"multipart/form-data"
        },
        data: newCategory
    })
    .then(response=>{
        console.log(response.data);
        return response;
    })
    .catch(error =>{
        console.log(error.response.data);
        return error;
    })
} 

export const addItemtoDB = (item,jwt) =>{
    const bearer = "Bearer "+jwt;
    console.log(item)
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

export const getAllItem = (jwt) =>{
    const bearer = "Bearer "+jwt;

    return axios({
        method: 'get',
        url: String(API) + 'menu/get-all-items',
        headers: {
            'Authorization': bearer
        }
    }).then(response=>{
        return response.data
    }).catch(error=>{
        console.log(error.response.data);
    })
}

export const getItembyCategory = (category,jwt) =>{
    const bearer = "Bearer "+jwt;
    console.log(String(category));
    let selectedCategory = new FormData();
    selectedCategory.append('category',String(category));
    return axios({
        method: 'get',
        url: String(API) + 'menu/get-items-by-category/'+category,
        headers: {
            'Authorization': bearer,
        }
    })
    .then(response=>{
        return response.data
    })
    .catch(error=>{
        console.log(error.response.data);
    })
}

export const updateImage = (id,file,jwt) =>{
    const bearer = "Bearer "+jwt;
    let itemData = new FormData();
    itemData.append("file",file);
    itemData.append("id", String(id));
    return axios({
        method:'put',
        url: String(API)+ 'menu/modify-item-image',
        headers:{
            "Authorization":bearer,
            "Content-Type":"multipart/form-data"
        },
        data: itemData
    })
    .then(response=>{
        console.log(response.data);
        return response;
    })
    .catch(error =>{
        console.log(error.response.data);
        return error;
    })
}

export const deleteItemfromDB = (id, jwt) =>{
    const bearer = "Bearer "+jwt;
    let itemData = new FormData();
    itemData.append("id",id);
    return axios({
        method:'delete',
        url:String(API) + 'menu/delete-item',
        headers:{
            "Authorization":bearer,
            "Content-Type":"multipart/form-data"
        },
        data: itemData
    })
    .then(response=>{
        return response;
    })
    .catch(error=>{
        return error;
    })
}
