import { React, useState, useEffect } from "react";
import Addaccounts from "../components/Addaccounts";
const Accounts = () => {
  const [addaccount, setaddaccount] = useState(false);
  console.log(addaccount);
  const handleCloseModal = () => {
    setaddaccount(false);
  };
  const handleOpenModal = () => {
    setaddaccount(true);
  };
  return (
    <>
      <div className="font-bold flex  text-white w-40 mx-5 my-5 lg:mx-10">
        <div className="md:hidden py-1.5 pr-4 text-1xl">
            X
        </div>
        <div className="text-2xl md:text-3xl">
          Accounts
        </div>
      </div>
      <div>
        <button className="bg-orange-600" onClick={handleOpenModal}>
          Add account
        </button>

        <Addaccounts isvisible={addaccount} onClose={handleCloseModal} />
      </div>
    </>
  );
};
export default Accounts;
