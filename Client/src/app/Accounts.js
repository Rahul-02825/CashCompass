import { React, useState, useEffect } from "react";
import Addaccounts from "../components/Addaccounts";
const Accounts = () => {
  const [addaccount, setaddaccount] = useState(false);
  console.log(addaccount)
  const handleCloseModal=()=>{
    setaddaccount(false)
  }
  const handleOpenModal=()=>{
    setaddaccount(true)
  }
  return (
    <div>
      <button
        className="bg-orange-600"
        onClick={handleOpenModal}
      >
        Add account
      </button>
      <Addaccounts 
      isvisible={addaccount}
      onClose={handleCloseModal}
       />
    </div>
  );
};
export default Accounts;
