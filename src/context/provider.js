import React, {useState} from 'react';

import PackageContext from './context';

const Provider = props => {
    const [show, setShow] = useState(false)
    const [cart, setCart] = useState([])
    // console.log(cart)
    return (
        <PackageContext.Provider
        value={{data: show,
            handleClose: () => {
                    setShow(false)
                },
            handleShow: ()=>{
                setShow(true)
            },
            cartData: cart,
            setCartItem: (item) =>{
                setCart([...cart, item])
            },
            setCart:(array)=>{
                setCart(array)
            }
        }}>
            {props.children}
        </PackageContext.Provider>
    )
}

export default Provider;