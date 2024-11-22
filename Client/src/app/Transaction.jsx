import React from "react";
import { useState } from "react";
import Addtransaction from '../components/Addtransaction'
import Addcategory from '../components/Addcategory'
import { Displaytransactions } from "../components/Displaytransactions";

const Transaction = () => {
  // for tranaction
  const [addtransaction, setaddtransaction] = useState(false);
  const handleCloseModal = () => {
    setaddtransaction(false);
  };
  const handleOpenModal = () => {
    setaddtransaction(true);
  };

// for category
  const [addcategory, setaddcategory] = useState(false);
  const handleCloseModalcat = () => {
    setaddcategory(false);
  };
  const handleOpenModalcat = () => {
    setaddcategory(true);
  };

  return (
    <>
      {/* title of the page */}
      <div className="font-bold flex  text-white w-40 mx-5 my-5 lg:mx-10">
        <div className="md:hidden py-1.5 pr-4 text-1xl">X</div>
        <div className="text-2xl md:text-3xl">Transactions</div>
      </div>
      {/* for mobile devices */}
      <div className="md:hidden">
        <div className="mx-5 flex">
          <button className="bg-[#5D3288] rounded-lg mx-2" onClick={handleOpenModal}>
            <div className="p-3 text-white"> + Add transaction</div>
          </button>
          <button className="bg-[#5D3288] rounded-lg mx-2" onClick={handleOpenModalcat}>
            <div className="p-3 text-white"> + Add category</div>
          </button>
          <button className="bg-[#5D3288] rounded-lg mx-2">
            <div className="p-3 text-white"> Filter</div>
          </button>
        </div>
        <Addtransaction isvisible={addtransaction} onClose={handleCloseModal}/>
        <Addcategory isvisible={addcategory} onClose={handleCloseModalcat}/>
        <Displaytransactions/>



      </div>
      {/* large devices */}
      <div className="md:block"></div>
    </>
  );
};
export default Transaction;
