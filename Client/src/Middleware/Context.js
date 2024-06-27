import React from "react";
import { useState,createContext } from "react";

const Usercontext=createContext()

export const UserProvider=({children})=>{

    const [user,setuser]=useState(null)

    return(
        <Usercontext.Provider value={{user,setuser}}>
            {children}
        </Usercontext.Provider>
    )   
}
export default Usercontext