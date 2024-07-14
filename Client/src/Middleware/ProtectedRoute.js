import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Usercontext from "../Middleware/Context";
import axios from "axios";
import { ClipLoader } from "react-spinners";

axios.defaults.withCredentials = true;

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setuser } = useContext(Usercontext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_PROD_URL + "/user"
              : process.env.REACT_APP_BACKEND_URL + "/user"
          }`,
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data) {
          //console.log(response)
          setUser(response.data);
          setuser(response.data);
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

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
