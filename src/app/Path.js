import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Logs from './Logs'
import Register from './Register'
import ProtectedRoutes from '../Middleware/ProtectedRoute'
import {UserProvider} from '../Middleware/Context'
import DebtPage from './DebtPage'
import DebtRecord from '../components/Debits/DebtRecord'


function Path(){
    return(
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Logs/>}/>    
                    <Route element={<ProtectedRoutes/>} >             
                        <Route path="/debt" element={<DebtPage/>}/> 
                        <Route path="/check" element={<DebtRecord/>}/> 
                    </Route>  
                    <Route path="/Register" element={<Register/>}/>    

                </Routes>
            </Router>
        </UserProvider>
        
    )
}
export default Path;