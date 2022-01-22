import React, {useEffect,useState} from "react";
import { Footer } from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import Navigation from "../core/Navigation";
import './helper/AdminMenu.css';
import { getAllItem, getItemCategory, getItembyCategory } from "./helper/adminapicall";
import ProductCard from "./helper/ProductCard";
import { CLOUDFRONT } from "../backend";

const ManageProducts = () =>{
    const user = isAuthenticated();
    const [items, setItems] = useState([]);
    const [itemCategories, setItemCategories] = useState([]);
    const [filterValue, setFilterValue] = useState("All");
    const handelFilter = event =>{
        setFilterValue(event.target.value);
    }
    const getProducts = () =>{
            if(filterValue==="All"){
                getAllItem(user.jwt)
                .then((data)=>{
                    if(typeof data !== "undefined"){
                        console.log("Successfully Request");
                        setItems(data);
                    }
                    //else redirect to home after loging out as jwt has expired
                })
                .catch(()=>{console.log("Error to get the product");})
            }
            else{
                getItembyCategory(filterValue,user.jwt)
                .then((data)=>{
                    if(typeof data !== 'undefined'){
                        // console.log("Filter done");
                        // console.log(data);
                        setItems(data);
                    }
                })
                .catch(()=>{console.log("Error to filter the product");})
            }
    }

    // API call to get all the Category
    const getCategory = () => {
        getItemCategory(user.jwt)
        .then(data=>{
            if(typeof data!== 'undefined'){
                // console.log(data);
                setItemCategories(data);
            }
        })
        .catch(error =>{console.log("Failed"+error)});
    }

    useEffect(()=>{
        getCategory()},[])

    useEffect(()=>{
        getProducts()
    },[filterValue])


    return(
        <div>
            <Navigation/>

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

            {/* Filter Tootl Bar */}
            <div className="btn-group mb-4" style={{zIndex:"0"}} role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" id="All" value="All" autoComplete="off" checked={filterValue=== "All"} onChange={handelFilter}/>
                <label className="btn btn-outline-primary" htmlFor="All">All</label>
                {itemCategories.map((category)=>{
                    return(
                        <div key={category.categoryId}>
                            <input type="radio" className="btn-check" id={category.name} value={category.name} autoComplete="off" checked={filterValue === category.name} onChange={handelFilter}/>
                            <label className="btn btn-outline-primary" htmlFor={category.name}>{category.name}</label>
                        </div>
                    )
                })}
            </div>
            

            {/* Body components */}
            <div className="row ">
                {items.map((item,index)=>{
                    return(
                        <ProductCard
                            key={item.itemId} 
                            id={item.itemId} 
                            src={item.imageFileName} 
                            title={item.name} 
                            desc={item.description} 
                            category={item.category.name} 
                            price={item.price} isVeg={item.isVeg} 
                            getItemFunction = {getProducts} />
                    )
                })}
            </div>
            </section>

            <Footer/>
        </div>
    )
}

export default ManageProducts;