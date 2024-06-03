import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from './Student_login'
import Register from './Register'


function Path(){
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>    
                <Route path="/Register" element={<Register/>}/>           
          </Routes>
        </Router>
    )
}
export default Path;