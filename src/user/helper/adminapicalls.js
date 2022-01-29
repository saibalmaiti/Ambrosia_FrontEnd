import axios from "axios";
import { API } from "../../backend";

export const getStatus = (date,jwt) =>{
    let bearer = "Bearer "+jwt;
    return axios({
        method: 'get',
        url: String(API) + 'vendor/get-active-status?date=' + date,
        headers:{
            'Authorization': bearer}
    })
    .then(response =>{
        return response
    })
    .catch(error=>{
        return error
    })
}

export const setStatus = (details,jwt) =>{
    let bearer = "Bearer "+jwt;
    const data = JSON.stringify(details);
    return axios({
        method: "post",
        url: String(API) + "vendor/set-active-status",
        headers:{
            'Authorization': bearer,
            'Content-Type': 'application/json'},
        data: data
    })
    .then(response=>{
        return (response)
    })
    .catch(error=>{
        return error
    })
}