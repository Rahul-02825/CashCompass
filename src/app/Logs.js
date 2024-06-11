import React, { useContext, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
axios.defaults.withCredentials = true;


export default function Admin_login() {
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [responseData, setResponseData] = useState(''); 

     //navigation
     const navigate =useNavigate()
     const navigatehome=useNavigate()
     const handlenavigate=()=>{
         navigate('./register')
     }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9001/login', { username, password });
            console.log(response)
            setResponseData(response.data.username); 
            setMessage('Login successful');
            console.log(responseData) 
            /*tried to get user fromn login */
          //  setuser({ username:response.data.username });
            await navigatehome('./debt')     
        } catch (err) {
            setMessage('Invalid credentials');
            console.error(err);
        }
    };   
     return (
        <div>
            <div className="flex h-screen">
                <div className="grid grid-cols-1  w-full">
                    <div className="w-full flex flex-col justify-center items-center h-full px">
                        <h1 className="text-center text-2xl font-bold py-8 text-gray-600 md:text-3xl">Member Login</h1>
                        <div className="w-full flex flex-col justify-center items-center">
                            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                                <input 
                                    className="rounded-2xl p-3 m-5 bg-gray-100 md:px-14 lg:px-16"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    required 
                                />
                                <input 
                                    className="rounded-2xl p-3 mx-5 bg-gray-100 md:px-14 lg:px-16" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required 
                                />
                                <button 
                                    className="rounded-2xl px-20 py-3 mx-5 mt-5 md:px-28 lg:px-32 bg-green-500 text-white font-semibold" 
                                    type="submit" 
                                >
                                    LOGIN
                                </button>
                            </form>
                            <p className="text-gray-500 mt-5">Forgot password?</p>
                            {message && <p>{message}</p>}
                            <div class="w-48 md:w-72 border-t-2 border-gray-300 mt-4"></div>
                            <button className="rounded-2xl px-16 py-3 mx-5 mt-5 md:px-28 lg:px-32 bg-blue-400 text-white font-semibold" onClick={handlenavigate} >
                                    REGISTER
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

