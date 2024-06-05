import React, { useContext } from "react";
//import { useState } from "react";
import Usercontext from '../Middleware/Context'


export default function Navbar(){
    
    const {user}=useContext(Usercontext)
    return(
        <div>Welcome {user ? user : 'Guest'}</div>

    )

}