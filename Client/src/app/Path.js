import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Logs from './Logs'
import Register from './Register'
import ProtectedRoutes from '../Middleware/ProtectedRoute'
import {UserProvider} from '../Middleware/Context'
import Home from './Home'
import DebtRecord from '../components/Debits/DebtRecord'
import Profile from './Profile'
import Accounts from './Accounts'
import Transactions from './Transaction'


function Path(){
    return(
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Logs/>}/>    
                    <Route element={<ProtectedRoutes/>} >             
                        <Route path="/home" element={<Home/>}/> 
                        <Route path="/profile" element={<Profile/>}/> 
                        <Route path="/accounts" element={<Accounts/>}/> 
                        <Route path="/transactions" element={<Transactions/>}/> 
                    </Route>  
                    <Route path="/Register" element={<Register/>}/>    

                </Routes>
            </Router>
        </UserProvider>
        
    )
}
export default Path;