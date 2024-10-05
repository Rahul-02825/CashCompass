import React from "react";

const AccountCard = () => {
  return (
    <div className="bg-[#232323] m-5 rounded-2xl sm:w-2/6 flex flex-col">
      {/* Purple box on the right */}
      <div className="flex justify-end">
        <div className="bg-[#5D3288] w-12 h-12 rounded-br-2xl"></div>
      </div>
      <div className="text-white m-1 px-5 text-2xl">Cash</div>
      <div className="flex ">
        <button className="bg-[#8C2D5B] m-3 rounded-lg px-3 py-1 text-white shadow-lg">
          All Events
        </button>
        <button className="bg-[#8C2D5B] m-3 rounded-lg px-3 py-1 text-white shadow-lg">
          Registered Events
        </button>
      </div>
    </div>
  );
};
export default AccountCard;
