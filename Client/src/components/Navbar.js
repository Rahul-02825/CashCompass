import React, { useEffect, useState } from "react";
import profileIcon from "../assets/Profile.svg";
import HomeIcon from "../assets/Home.svg";
import EventsIcon from "../assets/Events.svg";
import LeaderBoardIcon from "../assets/LeaderBoard.svg";
import ScanIcon from "../assets/scan.svg";
import { useNavigate,useLocation } from "react-router-dom";

function NavigationBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation()
  const handleClick = (index, route) => {
    setActiveIndex(index);
    navigate(`/${route}`);
  };
  const routes = ["home","accounts","transactions","budget"]
  useEffect(()=>{
    const index_value = location.pathname
    const new_var = index_value.replace("/","")
    const curr_index = routes.indexOf(new_var)
    setActiveIndex(curr_index !== -1 ? curr_index:0)
  },[location.pathname])

  return (
    <div className="relative flex justify-center my-10 w-screen p-1">
      <div className="bg-[#232323] mx-5 rounded-full grid grid-flow-col gap-20  sm:gap-28 p-1 lg:w-1/2 sm:w-8/12 ">
        <div className="grid grid-flow-col gap-2.5 sm:gap-x-4 lg:gap-x-2">
          <div
            className={`rounded-full p-2 m-1 sm:mx-2 sm:p-2.5 lg:p-1 text-white cursor-pointer ${
              activeIndex === 0 ? "bg-[#C02727]" : "bg-[#232323]"
            }`}
            onClick={() => handleClick(0,"home")}
          >
            {/* icons */}
            <div className="grid grid-flow-row place-items-center px-1">
              <div>
                <img
                  src={HomeIcon}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              </div>

              <div className="hidden lg:block text-center">Home</div>
            </div>
          </div>
          <div
            className={`rounded-full p-2 m-1 sm:mx-2 sm:px-2.5 lg:p-1 text-white cursor-pointer ${
              activeIndex === 1 ? "bg-[#C02727]" : "bg-[#232323]"
            } text-center`}
            onClick={() => handleClick(1,"accounts")}
          >
            {/* icons */}
            <div className="grid grid-flow-row place-items-center ">
              <div>
                <img
                  src={EventsIcon}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="hidden lg:block text-center">Accounts</div>
            </div>
          </div>
        </div>

        <div className="grid grid-flow-col gap-2.5 sm:gap-x-4 lg:gap-x-2">
          <div
            className={`rounded-full p-2 m-1 sm:mx-2 sm:p-2.5 lg:p-1 text-white cursor-pointer ${
              activeIndex === 2 ? "bg-[#C02727]" : "bg-[#232323]"
            }`}
            onClick={() => handleClick(2,"transactions")}
          >
            {/* icons */}
            <div className="grid grid-flow-row place-items-center">
              <div>
                <img
                  src={LeaderBoardIcon}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="hidden lg:block text-center">Transaction</div>
            </div>
          </div>
          <div
            className={`rounded-full p-2 m-1 sm:mx-2 sm:p-2.5 lg:p-1 text-white cursor-pointer ${
              activeIndex === 3 ? "bg-[#C02727]" : "bg-[#232323] text-center"
            }`}
            onClick={() => handleClick(3,"budget")}
          >
            {/* icons */}
            <div className="grid grid-flow-row place-items-center ">
              <div>
                <img
                  src={ScanIcon}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="hidden lg:block text-center">Budget</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-[calc(50%+1px)] transform -translate-x-1/2 -top-3 sm:-top-4 bg-[#232323] rounded-full p-2 sm:p-3 text-white z-10 cursor-pointer shadow-lg">
        <div className="rounded-full bg-[#5D3288] p-4 sm:p-6">
          <img
            src={profileIcon}
            alt=""
            style={{ width: "28px", height: "28px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
