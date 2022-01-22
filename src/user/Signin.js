import React, {useState} from "react";
import {Form,Button,Modal} from "react-bootstrap";
import Context from "../context/context";
import {signin, authenticate, isAuthenticated, generateOTP, changePassword} from "../auth/helper";
import { ToastContainer, toast } from 'react-toastify';
import {Redirect} from "react-router-dom";




const Signin = () =>{

    //State Variables
    const [state, setState] = useState("signin");

    const [values, setValues] = useState({
        username:"",
        password:"",
        error:""
    })

    const [renderObject, setRenderobject] = useState()

    const [email, setEmail] = useState({
        email:""
    });

    const [otp, setOtp] = useState({
        otp:""
    });

    const [passwords, setPasswords] = useState({
        password:"",
        confrpassword:""
    });

    const [rotp, setRotp] = useState()

    //state Handling Functions
    const handelPasswords = name => event => {
        setPasswords({...passwords, [name]: event.target.value})
    }

    const handelOTP = name => event => {
        setOtp({...otp, [name]: event.target.value})
    }

    const handelEmail = name => event =>{
        setEmail({...email,[name]: event.target.value})
    }

    // eslint-disable-next-line
    const {username,password,error} = values
    

    const handelChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    // OnClick Functions
    const onSubmit = event => {
      event.preventDefault();
      setValues({...values, error: false});
      signin({username, password})
          .then(data => {
              // console.log(data.jwt)
              // console.log(data)
              if (typeof data.jwt!== "undefined"){
                  authenticate(data, ()=>{
                      setValues({...values,username:"",password:""});
                      
                      
                    //   successMessage("Sign in Successful");
                      setRenderobject(performRedirect());
                  });
                  
              }
                else {
                    setValues({...values,error: data});
                    errorMessage(data);
                    

              }})
          .catch(()=>{console.log("Error in Sign in")})

    }

    const onEmailSubmit = () =>{
        generateOTP(email)
        .then(data=>{
            if(typeof data.otp!== "undefined"){
                setRotp(data.otp);
                alert("OTP send to your email");
                setState("otp");
            }
            else{
                setEmail({...email,email:""});
                alert(data);
            }
        })
        .catch("Error in OTP generation");
        
    }

    const onOtpSubmit = () =>{
        console.log(otp.otp)
        console.log(rotp)
        if(String(rotp) === String(otp.otp)){
            setOtp({...otp,otp:""});
            setState("password");
        }
        else{
            setOtp({...otp,otp:""})
            alert("Wrong OTP enterd. Enter the correct OTP");
        }   
    }

    const onPasswordSubmit = (next) =>{
        console.log(passwords.password);
        console.log(passwords.confrpassword);
        if(String(passwords.password) === String(passwords.confrpassword)){
            changePassword(email.email,passwords.password)
            .then(data=>{
                if(typeof data.success!== "undefined"){
                    setEmail({...email,emai:""});
                    setPasswords({...passwords,password:"",confrpassword:""});
                    successMessage("Password Reset Successful");
                    next();
                }
                else{
                    alert("ERROR: "+data);
                }
            })
            .catch(console.log("Failed to set Password"));
            
        }
        else{
            alert("Confirm Password Does not Match");
        }
        
    }

    //Success and error Toasts
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

    //Redirect Function for Signin
    const performRedirect = () =>{
        const user = isAuthenticated();
            if(user && user.appUserRole === "ADMIN"){
                console.log("redirect to admin")
                return <Redirect to="/admin/dashboard" />
            }
            else{
                console.log("redirect to customer")
                return <Redirect to="/user/dashboard" />
            }
    }

    //All Forms
    const SinginForm = () =>{
        return(
        <Form>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={username} onChange={handelChange("username")} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handelChange("password")} />
            </Form.Group>
        </Form>);
    }

    const enterEmailForm = () =>{
        return(
        <Form>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email.email} onChange={handelEmail("email")} />
            </Form.Group>
        </Form>
        );
    }
    const enterOTPForm = () =>{
        return(
        <Form>
            <Form.Group className="mb-3" controlId="otp">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control type="password" placeholder="Enter OTP" value={otp.otp} onChange={handelOTP("otp")} />
            </Form.Group>
        </Form>  
        );
    }

    const enterPasswordForm = () =>{
        return(
        <Form>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control type="password" placeholder="Enter New Password" value={passwords.password} onChange={handelPasswords("password")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confrpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="text" placeholder="Confirm Password" value={passwords.confrpassword} onChange={handelPasswords("confrpassword")} />
            </Form.Group>
        </Form> 
        );
    }

    //Main rendering object Return
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
                        <Modal show={context.data} onHide={()=>{setEmail({...email,email:""});
                                setOtp({...otp,otp:""});
                                setPasswords({...passwords,password:"",confrpassword:""});
                                setState("signin");
                                context.handleClose();}}>
                            <Modal.Header>
                                {(state==="signin")&&(<Modal.Title>Signin Here</Modal.Title>)}
                                {!(state==="signin")&&(<Modal.Title>Foreget Password</Modal.Title>)}
                            </Modal.Header>
                            <Modal.Body>
                                {(state==="signin")&&(<React.Fragment>
                                {SinginForm()}
                                <p className="text-primary" style={{cursor: "pointer"}} onClick={()=>{
                                    setState("email")}}>
                                    Forget Password
                                </p>
                                {console.log(renderObject)}
                                </React.Fragment>)}
                                {(state==="email")&&enterEmailForm()}
                                {(state==="otp")&&enterOTPForm()}
                                {(state==="password")&&enterPasswordForm()}
                                {renderObject}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={()=>{setEmail({...email,email:""});
                                setOtp({...otp,otp:""});
                                setPasswords({...passwords,password:"",confrpassword:""});
                                setState("signin");
                                context.handleClose();}}>Close</Button>
                                {(state==="signin")&&(<Button variant="primary" style={{backgroundColor: "#EC255A"}} onClick={(event)=> {
                                    onSubmit(event);
                                    context.handleClose();
                                }}>Sign In</Button>)}
                                {!(state==="signin")&&(<Button variant="primary" style={{backgroundColor: "#EC255A"}} onClick={()=> {
                                (state==="email")&&onEmailSubmit();
                                (state==="otp") && onOtpSubmit();
                                (state==="password"&&onPasswordSubmit(()=>{context.handleClose();setState("signin");}));
                            }}>Submit</Button>)}
                            </Modal.Footer>
                        </Modal>
                    )
                }
            }
        </Context.Consumer>
            </>
        )
}
export default Signin;