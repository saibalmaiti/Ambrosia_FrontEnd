import axios from "axios";
import { API } from "../../backend";

//API: http://localhost:8081/

export const signup = user =>{
    // console.log(user)
    const userJSON = JSON.stringify(user); 
    // console.log(userJSON);
    return axios({
            method: 'post',
            url: String(API) + 'registration',
            headers: {
                "Content-Type":"application/json"
            },
            data: userJSON
        })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            // console.log(error.response.data)
            return(error.response.data);
        });
}

export const signin = user =>{
    const userJSON = JSON.stringify(user);
    // console.log(userJSON)
    return axios(
        {
            method:'post',
            url: String(API)+'authenticate',
            headers: {
                "Content-Type":"application/json"
            },
            data: userJSON
        })
        .then(function (response) {
            // console.log(response.data)
            return(response.data);
        })
        .catch(function (error) {
            // console.log(error.response.data);
            return error.response.data;
        });
}
export const generateOTP = email =>{
    let formData = new FormData();
    formData.append('email',email.email);
    return axios({
        method:'post',
        url:String(API)+'reset_password/request',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        data: formData
    }).then(function(response){
        return ({"otp":response.data})
        
    })
    .catch(function(error){
        console.log(error.response.data)
        return(error.response.data)
    });
}

export const changePassword = (email,password) =>{
    console.log(email,password);
    let formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    return axios({
        method:'put',
        url:String(API)+'reset_password/update',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        data: formData
    }).then(function(response){
        console.log(response);
        return ({"success":response.data});
    })
    .catch(function(error){
        return(error.response.data);
    })
}

export const authenticate = (data, next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

export const signout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();
    }
}

export const isAuthenticated = () =>{
    if(typeof window === "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else
        return false
};