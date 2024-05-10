import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

import Role from './Role'
import Adminlogin from './Admin_login'
import Studentlogin from './Student_login'
import Facultylogin from './Faculty_login'


function Path(){
    return(
        <Router>
            <Routes>
                <Route path="" element={<Role/>}/>
                <Route path="/Adminlogin" element={<Adminlogin/>}/>
                <Route path="/Studentlogin" element={<Studentlogin/>}/>
                <Route path="/Facultylogin" element={<Facultylogin/>}/>               
          </Routes>
        </Router>
    )
}
export default Path;