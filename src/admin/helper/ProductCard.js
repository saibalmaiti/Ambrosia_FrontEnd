import React, { useState, useRef, useEffect } from "react";
import { CLOUDFRONT } from "../../backend";
import { deleteItemfromDB, updateImage } from "./adminapicall";
import {isAuthenticated} from "../../auth/helper/index"; 
import "../../core/Navigation.css";
import "./AdminMenu.css";


const ProductCard=(props)=>{

    // Update image
    const [imgname, setImgname] = useState(props.src);
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const selectImage = () =>{
        inputFile.current.click();
    }
    const handelFile = event =>{
        if(window.confirm("Do you want to upload this image?")){
            setSelectedFile(event.target.files[0])
        }
        else{
            console.log("no image added");
            setSelectedFile(null);
        }
    }

    useEffect(()=>{
        if(selectedFile){
            console.log(selectedFile)
            const user = isAuthenticated();
            updateImage(props.id,selectedFile,user.jwt)
            .then(data =>{
                if(typeof data.data !== 'undefined'){
                    alert("Image updated Successfully");
                    setImgname(data.data.imageFileName);
                }
                else{
                    alert(data.response.data);
                }
                setSelectedFile(null);
            })
            .catch(()=>{console.log("error in image updation")})
        }},[selectedFile])

    // delete item
    const deleteItem =()=>{
        const user = isAuthenticated();
        deleteItemfromDB(props.id,user.jwt)
        .then(data=>{
            if(typeof data.data !== 'undefined'){
                alert(data.data)
                props.getItemFunction();
            }
            else{
                alert(data.response.data);
            }
        })
        .catch(()=>{console.log("error in item deletion")})
    }

    // const updateItem =()=>{
        // var obj = {
        //     "id":props.id,
        //     "description": props.desc,
        //     "name": props.title,
        //     "isVeg":props.isVeg,
        //     "imageFileName": imgname,
        //     "category":props.category
        // }
    //     console.log(obj);
    // }
    return(<div className="col-4 mb-5">
                <div className="card me-2" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",height:"100%"}}>
                    <div className="container">
                        <img src={String(CLOUDFRONT)+imgname} className="card-img-top" alt="..."/>
                        <div className="overlay" onClick={selectImage}>
                        {/* Useref hooks to be used */}
                            <input type="file" id="file" ref={inputFile} onChange={handelFile} style={{ display: "none" }}/>
                            <div className="text">Update Image</div></div>
                        
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{props.title}</h4>
                        <p className="card-text">{props.desc}</p>
                        <div className="row">
                            <div className="col-4"><h5 className="price-tag">{"₹"+props.price}</h5></div>
                            <div className="col-6"><h5 style={{color:"#292C6D"}}>{(props.category.name.charAt(0).toUpperCase() + props.category.name.slice(1))}</h5></div>
                            <div className="col-2">{props.isVeg ? <img src="/vegsign.png" style={{height:"20px",width:"20px", display:"inline-block"}} alt="..."/>:
                        <img src="/nonvegsign.png" style={{height:"20px",width:"20px"}} alt="..."/>}</div> 
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn button" onClick={()=>{props.updateItemFunction({
                            "id":props.id,
                            "description": props.desc,
                            "name": props.title,
                            "isVeg":props.isVeg,
                            "price":props.price,
                            "imageFileName": imgname,
                            "category":props.category
                        },true)}}>Update</button>
                        <button className="btn button ms-lg-auto" onClick={deleteItem}>Remove</button>
                    </div>
                </div>        
    </div>
    
);}

export default ProductCard;