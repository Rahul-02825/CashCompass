import React, { useEffect, useState } from "react";
import axios from "axios";

export const Displaytransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // ✅ Ensure response data is an array
        if (Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          console.error("API response is not an array:", response.data);
          setTransactions([]); // Ensure transactions is always an array
        }
      } catch (err) {
        console.error("Error in fetching transactions:", err);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="m-4 font-bold text-1xl text-white sm:mx-16">
        Recent Transactions:
      </div>

      {/* Loading state */}
      {loading && <div className="text-white text-center">Loading...</div>}

      {/* Error message */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Transactions list or No Transactions message */}
      {!loading && transactions.length === 0 ? (
        <div className="text-white text-center p-4">No transactions found</div>
      ) : (
        <div className="flex flex-col sm:items-center lg:items-end overflow-y-auto max-h-[75vh] scrollbar-hide">
          {Array.isArray(transactions) ? (
            transactions.map((item, index) => (
              <div
                key={index}
                className="sm:w-2/3 lg:w-1/3 rounded-lg m-2 p-2 text-white bg-zinc-900"
              >
                <div className="flex justify-between">
                  <div className="bg-cyan-950 rounded-xl p-3">
                    {item.accountName}
                  </div>
                  <div className="text-2xl">
                    {item.type === "income" ? "<-" : "->"}
                  </div>
                  <div className="bg-cyan-950 rounded-xl p-3">
                    {item.categoryName}
                  </div>
                  <div
                    className={`py-4 ${
                      item.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.type === "income"
                      ? "+$" + item.amount
                      : "-$" + item.amount}
                  </div>
                </div>
                <div className="p-2 my-2">{item.description}</div>
              </div>
            ))
          ) : (
            <div className="text-white text-center p-4">
              Invalid transactions data
            </div>
          )}
        </div>
      )}
    </div>
  );
};
