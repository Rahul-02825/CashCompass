import React, { useState } from 'react';
import axios from 'axios';
import logo from "../assets/Login_logo.jpg"; // Move this import to the top

axios.defaults.withCredentials = true;

export default function Admin_login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [responseData, setResponseData] = useState(null); // State to store response data

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9001/login', { username, password });
            setResponseData(response.data); 
            setMessage('Login successful');
        } catch (err) {
            setMessage('Invalid credentials');
            console.error(err);
        }
    };

    return (
        <div>
            <div className="flex h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                    <div
                        className="hidden md:block w-full shadow-2xl"
                        style={{ backgroundImage: `url(${logo})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    ></div>
                    <div className="w-full flex flex-col justify-center items-center h-full">
                        <h1 className="text-center text-2xl font-bold py-8 text-gray-600">Member Login</h1>
                        <div className="w-full flex flex-col justify-center items-center">
                            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                                <input 
                                    className="rounded-2xl p-3 m-5 bg-gray-100 lg:px-10"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    required 
                                />
                                <input 
                                    className="rounded-2xl p-3 mx-5 bg-gray-100 lg:px-10" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required 
                                />
                                <button 
                                    className="rounded-2xl px-20 py-3 mx-5 mt-5 lg:px-30 bg-green-500 text-white font-semibold" 
                                    type="submit"
                                >
                                    LOGIN
                                </button>
                            </form>
                            <p className="text-gray-500 mt-5">Forgot password?</p>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
