import React from "react";
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
                            <Link className="nav-link" to="/"><nav className="Link">Home</nav></Link>
                            <Nav.Link><nav className="Link">About</nav></Nav.Link>
                            <Nav.Link><nav className="Link">Menu</nav></Nav.Link>
                            <nav className="Link"><NavDropdown title="Pages" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown></nav>
                            <Nav.Link><nav className="Link">Contact</nav></Nav.Link>
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