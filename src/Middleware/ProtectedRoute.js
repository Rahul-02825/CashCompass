import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; 

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:9001/user', { withCredentials: true });
                if (response.data) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoutes;
