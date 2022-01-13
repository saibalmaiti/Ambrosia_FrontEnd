import React, {useState} from "react";
import {Form,Button,Modal} from "react-bootstrap";
import { signup } from "../auth/helper";
import Context from "../context/context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () =>{

    const [values, setValues] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        role:"customer",
        error:"",
        success:false
    })
    // eslint-disable-next-line
    const {firstName,lastName,email,password,role,error,success} = values

    const handelChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }
    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({firstName,lastName,email,password,role})
        .then(data =>{
            if(typeof data.message!== "undefined")
                {console.log(data.message)
                successMessage(data.message)
                setValues({...values,
                    firstName:"",
                    lastName:"",
                    email:"",
                    password:"",
                    role:"customer",
                    error:"",
                    success:true})
                }
            else
                {console.log(data)
                errorMessage(data)
                setValues({...values,error:data,success:false,firstName:"",
                lastName:"",
                email:"",
                password:"",
                role:"customer"})}
                
        })
        .catch(error =>{
            console.log(error)
        })
        
    }

    const successMessage = (msg) =>{
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

    const SingupForm = () =>{
        return(
        <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" onChange={handelChange("firstName")} value={firstName} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" onChange={handelChange("lastName")} value={lastName} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handelChange("email")} value={email}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handelChange("password")} value={password}/>
                <Form.Text className="text-muted">
                    Password should be of minimum of length 8 and must contain one capital letter one number and a special charachter 
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicRadio">
                <Form.Check type="radio" label="I am an Admin" value="admin" onChange={handelChange("role")} />
            </Form.Group>
        </Form>
        );
    }
    return(
    <>
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
    <Context.Consumer>
            {
                (context) =>{
                    return (
                        <Modal show={context.data} onHide={context.handleClose}>
                            <Modal.Header>
                                <Modal.Title>Register Here</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {SingupForm()}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={context.handleClose}>Close</Button>
                                <Button variant="primary" style={{backgroundColor: "#EC255A"}} onClick={(event)=>{onSubmit(event);context.handleClose();}}>Sign Up</Button>  
                            </Modal.Footer>
                        </Modal>
                    )
                }
            }
    </Context.Consumer>
    </>
    )
}
export default Signup;