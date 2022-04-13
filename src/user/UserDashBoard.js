import React, {useState, useEffect} from  "react";
import Base from "../core/Base";
import Navigation from "../core/Navigation";
import { getActiveItem } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";
import { CLOUDFRONT } from "../backend";
import CustomerProductCard from "./helper/CustomerProductCard";
import Provider from "../context/provider";


const UserDashBoard = () =>{
    const user = isAuthenticated();

    const [items, setItems] = useState([]);
    
    const getAllActiveItem = () =>{
        getActiveItem(user.jwt)
        .then((data)=>{
            if(typeof data !== "undefined"){
                console.log("Successfully Request");
                setItems(data);
            }
            //else redirect to home after loging out as jwt has expired
        })
        .catch(()=>{console.log("Error to get the product");})
    }
    useEffect(()=>getAllActiveItem(),
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    [])

    return(
        <Provider>
        <div>
            <Navigation/>
            <Base title1="Welcome to" title2="Ambrosia">
                <section className="ps-5 pe-5 mt-4">
                    {/* Title component */}
                    <div className="row justify-content-center" style={{marginBottom:"30px"}}>
                        <div className="col-lg-6">
                            <div className="text-center">
                                <img src={String(CLOUDFRONT)+"banner/title-shape.png"} alt="..."/>
                                <h3>Current Menu Items</h3>
                            </div>
                        </div>
                    </div>
                    {/* Body components */}
                    <div className="row ">
                        {items.map((item,index)=>{
                            return(
                                <CustomerProductCard
                                    key={item.itemId} 
                                    id={item.itemId} 
                                    src={item.imageFileName} 
                                    title={item.name} 
                                    desc={item.description} 
                                    category={item.category} 
                                    price={item.price}
                                    isVeg={item.isVeg}
                                    itemObj = {item}
                                    />
                            )
                        })}
                    </div>
                </section>
            </Base>
        </div>
        </Provider>
    )
}

export default UserDashBoard;