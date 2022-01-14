import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import {FaShoppingBasket} from 'react-icons/fa';
import {Link, withRouter} from "react-router-dom";
import Provider from "../context/provider";
import Context from "../context/context";
import { CLOUDFRONT } from "../backend";
import "./Navigation.css";
import Signin from "../user/Signin";
import Signup from "../user/Signup";
import { isAuthenticated, signout } from "../auth/helper";



const Navigation = ({history}) =>{
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
                                <Nav.Link><nav className="Link">Menu</nav></Nav.Link>
                                <Nav.Link><nav className="Link">Posts</nav></Nav.Link>
                            </React.Fragment>}
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className="right-navbar">
                <FaShoppingBasket className="cart-icon"/>
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