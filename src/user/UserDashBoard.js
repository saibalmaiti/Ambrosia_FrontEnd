import React, { useState, useEffect, useCallback } from "react";
import Base from "../core/Base";
import Navigation from "../core/Navigation";
import { getActiveItem } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";
import { CLOUDFRONT } from "../backend";
import CustomerProductCard from "./helper/CustomerProductCard";
import Provider from "../context/provider";
import { getStatus } from "./helper/adminapicalls";





const UserDashBoard = () => {
    const user = isAuthenticated();
    const date = new Date().toISOString().substring(0, 10);

    const [items, setItems] = useState([]);

    const [shopestatus, setShopstatus] = useState('CLOSE');

    const getshopstatus = useCallback(() => {
        getStatus(date, user.jwt)
            .then(response => {
                if (typeof (response.data) !== 'undefined') {
                    console.log(response.data);
                    if (response.data === 'OPEN') {
                        setShopstatus('OPEN')
                    }
                    else {
                        setShopstatus('CLOSE')
                    }
                }
                else {
                    setShopstatus('CLOSE')
                }
            })
            .catch(() => console.log('Error to get status'))
    })

    const getAllActiveItem = () => {
        getActiveItem(user.jwt)
            .then((data) => {
                if (typeof data !== "undefined") {
                    console.log("Successfully Request");
                    setItems(data);
                }
                //else redirect to home after loging out as jwt has expired
            })
            .catch(() => { console.log("Error to get the product"); })
    }
    useEffect(() => {
        getAllActiveItem();
        getshopstatus()
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps    
        [])

    return (
        <Provider>
            <div>
                <Navigation />
                <Base title1="Welcome to" title2="Ambrosia">


                    {shopestatus === "OPEN" ? (<section className="ps-5 pe-5 mt-4 orderSection" id="menu">
                        {/* Title component */}
                        <div className="row justify-content-center" style={{ marginBottom: "30px" }}>
                            <div className="col-lg-6">
                                <div className="text-center">
                                    <img src={String(CLOUDFRONT) + "banner/title-shape.png"} alt="..." />
                                    <h3>Current Menu Items</h3>
                                </div>
                            </div>
                        </div>
                        {/* Body components */}
                        <div className="row">
                            {items.map((item, index) => {
                                return (
                                    <CustomerProductCard
                                        key={item.itemId}
                                        id={item.itemId}
                                        src={item.imageFileName}
                                        title={item.name}
                                        desc={item.description}
                                        category={item.category}
                                        price={item.price}
                                        isVeg={item.isVeg}
                                        itemObj={item}
                                    />
                                )
                            })}
                        </div>
                    </section>) : (<div style={{ textAlign: "center", padding: "80px" }}>
                        <img src={String(CLOUDFRONT) + "banner/title-shape.png"} alt="..." />
                        <h1>Sorry Shop is Closed</h1>
                        <img src="/shop-close.png" style={{ height: "30%", width: "30%", marginLeft: "auto", marginRight: "auto" }} alt="...closed" />
                    </div>)}
                </Base>
            </div>
        </Provider>
    )
}


export default UserDashBoard;
