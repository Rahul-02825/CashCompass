import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Logs from './Logs'
import Register from './Register'


function Path(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Logs/>}/>    
                <Route path="/Register" element={<Register/>}/>           
          </Routes>
        </Router>
    )
}
export default Path;