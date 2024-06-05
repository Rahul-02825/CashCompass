import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Logs from './Logs'
import Register from './Register'
//import Navbar from "../components/Navbar";
import ProtectedRoutes from '../Middleware/ProtectedRoute'
import {UserProvider} from '../Middleware/Context'
import Home from './Home'




function Path(){
    return(
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Logs/>}/>    
                    <Route element={<ProtectedRoutes/>} >             
                        <Route path="/home" element={<Home/>}/>   

                    </Route>  
                    <Route path="/Register" element={<Register/>}/>                
                </Routes>
            </Router>
        </UserProvider>
        
    )
}
export default Path;