import React, { useEffect, useState } from "react";
import Navigation from "../core/Navigation";
import {CLOUDFRONT} from "../backend";
import "./helper/admindashboard.css";
import { getStatus, setStatus } from "./helper/adminapicalls";
import { isAuthenticated } from "../auth/helper";
import { Form } from "react-bootstrap";


const AdminDashBoard = () =>{
    const [disableButton, setDisableButton] = useState(false);
    const [shopestatus, setShopstatus] = useState('CLOSE');
    const [verified, setVerified] = useState(null);

    const user = isAuthenticated();
    const date = new Date().toISOString().substring(0,10);

    const [email, setEmail] = useState("");

    const getshopstatus = () =>{
        getStatus(date,user.jwt)
        .then(response=>{
            if(typeof(response.data) !== 'undefined'){
                // console.log(response.data);
                if(response.data ==='OPEN'){
                    setShopstatus('OPEN')
                }
                else{
                    setShopstatus('CLOSE')
                }
            }
            else{
                setShopstatus('CLOSE')
            }
        })
        .catch(()=>console.log('Error to get status'))
    }

    const setshopstatus = () =>{
        const details = {
            "appUserId":user.appUserId,
            "date": date,
            "status": shopestatus==='CLOSE'?'OPEN':'CLOSE'
        }
        setStatus(details,user.jwt)
        .then(response =>{
            if(typeof response.data !== 'undefined'){
                sleep(8000).then(()=>{
                    getshopstatus()
                    setDisableButton(false)
                    setVerified(null)
                    setEmail("")})
            }
            else{
                alert("Failed to Change Shop Status");
                setDisableButton(false)
                setVerified(null)
                setEmail("")
            }
        })
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const onVerify = event =>{
        event.preventDefault();
        if(user.email === email){
            setVerified(true)
            setshopstatus()
        }
        else{
            setVerified(false)
        }
    }


    const onCancel = event =>{
        event.preventDefault();
        setDisableButton(false)
        setVerified(null)
        setEmail("")
    }

    const onSubmit = event =>{
        event.preventDefault();
        setDisableButton(true);
    }

    useEffect(()=>
        getshopstatus(),[])
    
    const verifyForm = () =>{
        return(
            <div>
                <Form className="mt-5">
                    <h5>Enter your email to verify you want to complete the action.</h5>
                    <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event)=>setEmail(event.target.value)} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <button className="btn btn-primary" onClick={onVerify}>Verify</button>
                <button className="btn btn-primary ms-2" onClick={onCancel}>Cancel</button>
                </Form>
                <p className={verified?"text-success":"text-danger"}>{verified===null?"":verified?"Verification Successful":"Verification Failed"}</p>
            </div>
        )
    }
    return(
        <div>
            <Navigation/>
            <section className="shop-control-area">
                <div className="contanier">
                    <div className="shop-control-box">
                        {/* Title of The Section */}
                        <div className="row justify-content-center" style={{marginBottom:"10px"}}>
                            <div className="col-lg-6">
                                <div className="text-center">
                                    <img src={String(CLOUDFRONT)+"banner/title-shape.png"} alt="..."/>
                                    <h3>Open or Close Shop</h3>
                                    {/* <p>The Process of our service</p> */}
                                </div>
                            </div>
                        </div>
                        {/* Body of the Section */}
                        <div className="row">
                            <div className="col-7">
                                <div className="container" style={{height:"25rem"}}>
                                {shopestatus==='CLOSE'?<img src="/shop-close.jpg" style={{height:"100%",width:"100%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.5)"}} alt="...closed"/>
                                :<img src="/shop-open.jpg" style={{height:"100%",width:"100%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.5)"}} alt="...closed"/>}
                                </div>
                            </div>
                            <div className="col-5">
                                <button className="btn btn-primary btn-lg" style={{height:"20%",width:"100%", fontSize:"30px"}} disabled={disableButton} onClick={onSubmit}>
                                {shopestatus==='CLOSE'?disableButton&&verified?
                                    <div>
                                        Opening Shop
                                        <div className="spinner-border text-light ms-2" role="status" aria-hidden="true">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>:"Open Shop":disableButton&&verified?
                                    <div>
                                        Closing Shop
                                        <div className="spinner-border text-light ms-2" role="status" aria-hidden="true">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>:"Close Shop"}</button>
                                {disableButton?verifyForm() : null}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminDashBoard;