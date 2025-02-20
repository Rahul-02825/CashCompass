import { React, useState, useEffect } from "react";
import Addaccounts from "../components/Addaccounts";
import SpotlightCard from "../components/ui/SpotlightCard";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import useDataStore from "../store/data"

const Accounts = () => {

  const {
    data,
    loading,
    error,
    fetchaccount,
  } = useDataStore()

  const [addaccount, setaddaccount] = useState(false);
  const [accountsdata, setaccountsdata] = useState([]);
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setaddaccount(false);
  };
  const handleOpenModal = () => {
    setaddaccount(true);
  };

  useEffect(()=>{
    if (data.length===0){
      fetchaccount()
    }
  },[data.length,fetchaccount])
  // Group accounts by their group name
  const groupedAccounts = data.reduce((acc, account) => {
    if (!acc[account.group]) {
      acc[account.group] = [];
    }
    acc[account.group].push(account);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="font-bold flex text-white w-40 mx-5 my-5 lg:mx-10">
        <div className="md:hidden py-1.5 pr-4 text-1xl">X</div>
        <div className="text-2xl md:text-3xl">Accounts</div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto px-10  max-h-[70vh]">
        <button
          className="bg-[#5D3288] p-3 rounded-xl mb-5"
          onClick={handleOpenModal}
        >
          Add account
        </button>

        {/* Render Accounts by Group */}
        <div className="">
          {Object.keys(groupedAccounts).length > 0 ? (
            Object.entries(groupedAccounts).map(([groupName, accounts]) => (
              <div key={groupName}>
                {/* Group Name Heading */}
                <h2 className="text-white text-2xl font-bold mb-4">{groupName}</h2>

                {/* Accounts Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {accounts.map((account, index) => (
                    <SpotlightCard
                      key={index}
                      className="custom-spotlight-card h-48"
                      spotlightColor="rgba(0, 229, 255, 0.2)"
                    >
                      <div className="flex flex-col text-white">
                        <div className="font-semibold">{account.name}</div>
                        <div className="text-gray-300">{account.group}</div>
                        <div className="text-green-400">₹{account.balance}</div>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-center p-4">No accounts available</div>
          )}
        </div>
      </div>

      {/* Fixed Navbar at Bottom */}
      <footer className="">
        <Navbar />
      </footer>

      <Addaccounts isvisible={addaccount} onClose={handleCloseModal} />
    </div>
  );
};

export default Accounts;
