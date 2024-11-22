import React, { useEffect, useState } from "react";
import axios from "axios";

export const Displaytransactions = () => {


  const [transactions,setTransactions]=useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL
            : process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${baseUrl}/api/getTransaction`, {
          withCredentials: true,
        });
        setTransactions(response.data)
        console.log("Transactions fetched",response.data)
      } catch (err) {
        console.error("error in fetching transactions");
      }
    };

    fetchTransactions()
  },[]);
  return(
    <div>
        {
          transactions.map((item,index)=>(
            <div key={index} className=" w-full md:w-1/2 rounded-lg m-2 p-2">
              <div>transactions.name</div>
            </div>
          ))
        }
    </div>
  );
};
