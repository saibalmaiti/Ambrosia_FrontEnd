import React,{useState,useEffect} from "react";
import Navigation from "../core/Navigation";
import { CLOUDFRONT } from "../backend";
import {Form} from "react-bootstrap";
import { addItemtoDB, getItemCategory } from "./helper/adminapicall";
import "./helper/AdminMenu.css";
import "../core/Navigation.css";
import { isAuthenticated } from "../auth/helper";
import { ToastContainer, toast } from 'react-toastify';
import { Footer } from "../core/Base";


const AddProduct = ()=>{
    const [productDetails, setProductDetails] = useState({
        prodname:"",
        description:"",
        price:"",
        isVeg:"false",
        category:"",
        file:null
    });


    const {prodname, description, price, isVeg,category,file} = productDetails;

    const [listCategory, setListCategory] = useState([]);

    const [disableButton, setDisableButton] = useState(false);

    const user = isAuthenticated();

    const getItem = () => {
        getItemCategory(user.jwt)
        .then(data=>{
            // console.log(data);
            setListCategory(data);
        })
        .catch(error =>{console.log("Failed"+error)});
    }
    const addItem = () =>{
        setDisableButton(true);
        console.log(productDetails);
        addItemtoDB(productDetails, user.jwt).then(
            response=>{
                setDisableButton(false);
                if(typeof response.data !== "undefined"){
                setProductDetails({...productDetails, prodname:"",description:"",price:"",isVeg:"false",category:"",file:null});
                successMessage(response.data);
                }
                else{
                    errorMessage(response.response.data);
                }
            }
        )
        .catch(error=>{console.log("Error in addItem call",error);})
    }

    useEffect(()=>{
        getItem()
    },[])
    

    const handelChange = name => event => {
        setProductDetails({...productDetails, [name]: event.target.value})
    }
    const handelFile = name => event =>{
        setProductDetails({...productDetails,[name]: event.target.files[0]});
    }

    const successMessage = (msg) =>{
        console.log("Method called")
        return toast.success(msg, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const errorMessage = (msg) =>{
        return toast.error(msg, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const AddMenuItemForm = () =>{
        return(
            <Form>
            <Form.Group className="mb-3" controlId="prodname">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Product Name" value={prodname} onChange={handelChange("prodname")} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="proddesc">
                <Form.Label>Product Description</Form.Label>
                <Form.Control as="textarea" placeholder="Enter Product Description" value={description} onChange={handelChange("description")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prodprice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control type="number" placeholder="Enter Product Price" value={price} onChange={handelChange("price")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="isveg">
                <Form.Label>Is it Veg or NonVeg</Form.Label>
                <Form.Check 
                type='radio'
                id='veg'
                value='true'
                checked = {isVeg === 'true'}
                onChange={handelChange("isVeg")}
                label='Vegitarian'/>
                <Form.Check 
                type='radio'
                id='nonveg'
                value='false'
                checked = {isVeg === 'false'}
                onChange={handelChange("isVeg")}
                label='Non-Vegitarian'/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
                <Form.Label style={{marginRight:"20px"}}>Select Type of Meal </Form.Label>
                <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Enter or Select Product Category" value={category} onChange={handelChange("category")}/>
                <datalist id="datalistOptions">
                {listCategory.map((item, index)=>{
                    return(<option key={index} value={item.name}>{item.name}</option>)
                })}
                
                </datalist>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter Product Image</Form.Label>
                <Form.Control type="file" onChange={handelFile("file")}/>
            </Form.Group>
        </Form>
        )
    }

    return(
        <div>
            <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
            />
            <Navigation/>
            <div className="row menu-area">
            {/* Right side Rendered Objects */}
            <div className="col-3"></div>
            <div className="col-6">
                    <div className="overlay"></div>
                    <div className="form-card">
                        <div className="row justify-content-center" style={{marginBottom:"30px"}}>
                            <div className="col-lg-6">
                                <div className="text-center">
                                    <img src={String(CLOUDFRONT)+"banner/title-shape.png"} alt="..."/>
                                    <h3>Add Menu Item</h3>
                                    {/* <p>The Process of our service</p> */}
                                </div>
                            </div>
                        </div>
                        {/* {console.log(productDetails)} */}
                        {AddMenuItemForm()}
                        <button className="button signup"  onClick={addItem} disabled={disableButton}>
                        {disableButton?
                        <React.Fragment>
                            <div className="me-2">Adding...</div>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </React.Fragment>
                        : "Add"}
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        
    )

}
export default AddProduct;