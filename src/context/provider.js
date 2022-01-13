import React, {useState} from 'react';

import PackageContext from './context';

const Provider = props => {
    const [show, setShow] = useState(false)
    // console.log(show)
    return (
        <PackageContext.Provider
        value={{data: show,
            handleClose: () => {
                    setShow(false)
                },
            handleShow: ()=>{
                setShow(true)
            }
        }}>
            {props.children}
        </PackageContext.Provider>
    )
}

export default Provider;