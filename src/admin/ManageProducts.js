import React, {useEffect,useState} from "react";
import { Footer } from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import Navigation from "../core/Navigation";
import './helper/AdminMenu.css';
import { getAllItem, getItemCategory, getItembyCategory, updateItemDetailsinDB, addnewCategory } from "./helper/adminapicall";
import { Modal,Button,Form } from "react-bootstrap";
import ProductCard from "./helper/ProductCard";
import { CLOUDFRONT } from "../backend";

const ManageProducts = () =>{
    const user = isAuthenticated();
    const [items, setItems] = useState([]);
    const [itemCategories, setItemCategories] = useState([]);
    const [filterValue, setFilterValue] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [addcategory, setAddcategory] = useState(false);
    const [newcategory, setNewcategory] = useState("");
    const [updateItemDetails, setUpdateItemDetails] = useState({
        itemId: "",
        name: "",
        description: "",
        price: 0,
        imageFileName:"",
        isVeg: false,
        isActive: null,
        category: {categoryId:0,name:""}
    });
    
    const handelFilter = event =>{
        setFilterValue(event.target.value);
    }
    const handelNewCategory = event =>{
        setNewcategory(event.target.value);
    }
    const handelChange = name => event =>{
        if(name==='price' && (!isNaN(parseFloat(event.target.value)))){
            setUpdateItemDetails({...updateItemDetails,[name]:parseFloat(event.target.value)})
        }
        else if(name==='isVeg'){
            setUpdateItemDetails({...updateItemDetails,[name]:(event.target.value==='true')?true:false})
        }
        else if(name==='category'){
            // console.log("Here")
            setUpdateItemDetails({...updateItemDetails,[name]:(itemCategories.find(element=>element.categoryId===parseInt(event.target.value)))})
        }
        else{
            setUpdateItemDetails({...updateItemDetails, [name]:event.target.value})
        }
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
        getCategory()},
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])
    useEffect(()=>{
        getProducts()
    },[filterValue])

    const openUpdateModal = (itemDetails,isShowing) =>{
        setShowModal(isShowing);
        //set the id of the clicked object in the item state variable;
        setUpdateItemDetails({...updateItemDetails,
        itemId:itemDetails.id,
        name:itemDetails.name,
        description:itemDetails.description,
        price:itemDetails.price,
        imageFileName:itemDetails.imageFileName,
        isVeg:itemDetails.isVeg,
        isActive:itemDetails.isActive,
        category:itemDetails.category
        })
    }

    const updateModal = () =>{
        return(
            <Modal show={showModal} onHide={()=>{setShowModal(false); setAddcategory(false); setNewcategory("");}}>
                <Modal.Header>
                    <Modal.Title>Update Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Update Form */}
                    <Form>
                        <Form.Group className="mb-3" controlId="prodname">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Update Product Name" value={updateItemDetails.name} onChange={handelChange('name')}/>
                        </Form.Group>
                
                        <Form.Group className="mb-3" controlId="proddesc">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Update Product Description" value={updateItemDetails.description} onChange={handelChange('description')} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="prodprice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="number" placeholder="Update Product Price" value={updateItemDetails.price} onChange={handelChange('price')}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="isveg">
                            <Form.Label>Is it Veg or NonVeg</Form.Label>
                            <Form.Check 
                            type='radio'
                            id='veg'
                            value='true'
                            checked = {updateItemDetails.isVeg}
                            label='Vegitarian'
                            onChange={handelChange('isVeg')}
                            />
                            <Form.Check 
                            type='radio'
                            id='nonveg'
                            value='false'
                            checked = {!updateItemDetails.isVeg}
                            label='Non-Vegitarian'
                            onChange={handelChange('isVeg')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label style={{marginRight:"20px"}}>Select Type of Meal </Form.Label>
                            <select className="form-select" aria-label="Default select example" defaultValue={updateItemDetails.category.categoryId} onChange={handelChange('category')} disabled={addcategory}>
                            {itemCategories.map((item, index)=>{
                                return(<option key={index} value={item.categoryId}>{item.name}</option>)
                            })}
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="addcategory">
                            {!(addcategory)&&(<p className="text-primary" style={{cursor: "pointer"}} onClick={()=>setAddcategory(true)}>
                                Add New Category
                            </p>)}
                            {(addcategory)&&(<div>
                            <Form.Label>New Category</Form.Label>
                            <Form.Control type="text" placeholder="New Category Name" value={newcategory} onChange={handelNewCategory}/>
                            </div>)}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShowModal(false); setAddcategory(false); setNewcategory("");}}>Close</Button>
                <Button variant="primary" style={{backgroundColor: "#EC255A"}} onClick={()=> {onUpdate();}}>Update</Button>
                </Modal.Footer>
            </Modal>
        )
    }
    
    const onUpdate = () =>{
        //do the REST call
        if(addcategory){
            addnewCategory(newcategory,user.jwt)
            .then(response=>{
                if(typeof response.data!== 'undefined'){
                    setAddcategory(false);
                    setNewcategory("");
                    //local variable to change the category for new category
                    var updateItemDetailsJSON = updateItemDetails
                    updateItemDetailsJSON.category = response.data
                    updateItemDetailsinDB(JSON.stringify(updateItemDetailsJSON),user.jwt)
                    .then(response=>{
                        if(typeof response.data !== 'undefined'){
                            getProducts();
                            getCategory();
                            setShowModal(false)
                            
                        }
                    })
                    .catch(()=>{console.log("Error in update call")});
                }
                else{
                    //error in adding new category
                }
            })
            .catch(()=>console.log("Error while adding a new category"));
        }
        else{
            updateItemDetailsinDB(JSON.stringify(updateItemDetails),user.jwt)
            .then(response=>{
                if(typeof response.data !== 'undefined'){
                    getProducts();
                    setShowModal(false);
                }
            })
            .catch(()=>{console.log("Error in update call")});
        }
        
    }

    return(
        <div>
            {updateModal()}

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
                            category={item.category} 
                            price={item.price}
                            isVeg={item.isVeg}
                            isActive = {item.isActive} 
                            getItemFunction = {getProducts}
                            updateItemFunction = {openUpdateModal} />
                    )
                })}
            </div>
            </section>

            <Footer/>
        </div>
    )
}

export default ManageProducts;