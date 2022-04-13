import React from "react";
import { CLOUDFRONT } from "../../backend";
import "../../core/Navigation.css";
import { addToCart,increaseQuantity,decreaseQuantity } from "./userapicalls";
import { useContext, useState,useEffect} from "react";
import PackageContext from "../../context/context";

const CustomerProductCard = (props) =>{
    // const [item, setItem] = useState();
    const context = useContext(PackageContext);
    const [isAlreadyAdded,setIsAlreadyAdded] = useState(-1);

    useEffect(()=>{
        const index = context.cartData.findIndex(function(array) {
        return array.itemId === props.itemObj.itemId;
    });
    
    // console.log("Inside Use effect");
    // console.log(context.cartData);
    setIsAlreadyAdded(index);

    //------------------------Reason for two if controlling expression---------------------------------
    // while increasing isAlreadyAdded State variable will change late so it will not add to null element 
    // and while removing element index will first become -1 which will prevent from accessing a null object.
    //--------------------------------------------------------------------------------------------------
    
    if(isAlreadyAdded!==-1&&index!==-1){
        // console.log("is Added:"+index);
        // console.log("Item Quantity: "+context.cartData[index].Quantity);
        // console.log("Item:"+props.title+"Index:"+index);
        document.getElementById(props.id).innerHTML =context.cartData[index].Quantity;
    }
    },[context.cartData,isAlreadyAdded])


    return (
        <div className="col-4 mb-5">
            <div className="card me-2" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",height:"100%"}}>
                <img src={String(CLOUDFRONT)+props.src} className="card-img-top" alt="..."/>
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
                {}
                    {(isAlreadyAdded===-1)&&<button className="btn button" onClick={()=>{addToCart(context,props.itemObj);}}>Add to Cart</button>}
                    {(isAlreadyAdded!==-1)&&(<div>
                        <button type="button" className="btn btn-outline-secondary" onClick={()=>{decreaseQuantity(context,props.id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                            </svg>
                            <span className="visually-hidden">Button</span>
                        </button>
                        <span style={{padding:"20px"}} id={props.id}></span>
                        <button type="button" className="btn btn-outline-secondary" onClick={()=>{increaseQuantity(context,props.id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                            </svg>
                            <span className="visually-hidden">Button</span>
                        </button>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default CustomerProductCard;