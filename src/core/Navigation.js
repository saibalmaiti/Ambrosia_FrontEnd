import React from "react";
import {useContext,useEffect, useState} from 'react';
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {FaShoppingBasket} from 'react-icons/fa';
import {Link, withRouter} from "react-router-dom";
import Provider from "../context/provider";
import Context from "../context/context";
import { CLOUDFRONT } from "../backend";
import "./Navigation.css";
import Signin from "../user/Signin";
import Signup from "../user/Signup";
import { isAuthenticated, signout } from "../auth/helper";
import PackageContext from "../context/context";
import CartItem from "./helper/CartItem";




const Navigation = ({history}) =>{
    const context= useContext(PackageContext);
    const [totalQuantity, setTotalQuantity] = useState(0);
    useEffect(()=>{
        let quantity = 0;
        if(typeof(context.cartData)!=='undefined')
            {context.cartData.forEach(element => {
                quantity += element.Quantity
            });}
        setTotalQuantity(quantity)

    },[context.cartData])

    const listElement = () =>{
        if(context.cartData.length!==0){
        return(context.cartData.map((item,index)=>{
            return(
                <CartItem 
                    key={item.itemId}
                    name={item.name}
                    quantity={item.Quantity}
                    price={item.price}
                    src = {item.imageFileName}
                />
            )
        }))}
        else{
            //return if cart is empty
            return(<li><div className="dropdown-item">Cart is Empty</div></li>)
        }
    }

    return(
    <div className="large-container">
        <div className="Wrapper">
            <div className="left-navbar">
                <img src={CLOUDFRONT+"banner/icon.png"} className="logo" alt="..."/>
            </div>
            <div className="center-navbar">
                <Navbar expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {!isAuthenticated()&&<React.Fragment>
                                <Link className="nav-link" to="/"><nav className="Link">Home</nav></Link>
                                <Nav.Link><nav className="Link">About</nav></Nav.Link>
                                <Nav.Link><nav className="Link">Menu</nav></Nav.Link>
                                <Nav.Link><nav className="Link">Contact</nav></Nav.Link>
                            </React.Fragment>}
                            {isAuthenticated()&&(isAuthenticated().appUserRole === "USER")&&<React.Fragment>
                                <Link className="nav-link" to="/user/dashboard"><nav className="Link">Home</nav></Link>
                                <Nav.Link><nav className="Link">About</nav></Nav.Link>
                                <Nav.Link><nav className="Link">Menu</nav></Nav.Link>
                                <Nav.Link><nav className="Link">Contact</nav></Nav.Link>
                            </React.Fragment>}
                            {isAuthenticated()&&(isAuthenticated().appUserRole === "ADMIN")&&<React.Fragment>
                                <Link className="nav-link" to="/admin/dashboard"><nav className="Link">Home</nav></Link>
                                <Nav.Link><nav className="Link">Orders</nav></Nav.Link>
                                {/* <Link className="nav-link" to="/admin/menu"><nav className="Link">Menu</nav></Link> */}
                                <NavDropdown className="Link" title="Menu" id="basic-nav-dropdown">
                                <Link className="nav-link" to="/admin/menu/additem">Add Item</Link>
                                <Link className="nav-link" to="/admin/menu/edititem">View Menu</Link>
                                </NavDropdown>
                                <Nav.Link><nav className="Link">Posts</nav></Nav.Link>
                            </React.Fragment>}
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className="right-navbar">
                {isAuthenticated()&&(isAuthenticated().appUserRole === "USER")&&(<div className="dropdown"><button type="button" className="btn position-relative me-2" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <FaShoppingBasket className="cart-icon"/>
                <span className="position-absolute top-0 start-95 translate-middle badge rounded-pill bg-danger">
                    {totalQuantity} 
                </span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {
                        (listElement())

                    }
                    {(context.cartData.length!==0)&&(<li style={{float:"right",marginRight:"10px"}}><div className="dropdown container"><button type="button" className="btn btn-primary">Checkout</button></div></li>)}
                </ul>
                </div>)}

                {!isAuthenticated()&&(<React.Fragment>
                    <Provider>
                        <Context.Consumer>
                            {
                                (context) =>(<button className="button signin" onClick={context.handleShow}>Sign In</button>)
                            }
                        </Context.Consumer>
                        <Signin/>
                    </Provider>
                    <Provider>
                        <Context.Consumer>
                            {
                                (context) =>(<button className="button signup" onClick={context.handleShow}>Sign Up</button>)
                            }
                        </Context.Consumer>
                        <Signup/>
                    </Provider>
                </React.Fragment>)}
                <span>
                    {isAuthenticated() && <button className="button signup" onClick={()=>{signout(()=>{history.push("/")})}}>Sign Out</button>}
                </span>
            </div>
        </div>
    </div>
)}
export default withRouter(Navigation);