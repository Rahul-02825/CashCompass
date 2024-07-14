import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { TbMenu2 } from "react-icons/tb";
import Usercontext from '../Middleware/Context';
import { CgProfile } from "react-icons/cg";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Navbar({ toggleSidebar,message }) {
    const { user } = useContext(Usercontext);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [navMessage,setnavMessage]=useState(message)
    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const navmessage=()=>{
        setnavMessage(message)
    }
    const navigateProfile=useNavigate()
    const navigate={
        profile:function(){
            navigateProfile('../profile')
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="flex justify-between items-center shadow-lg py-3 ">
            {/* Left side content */}
            <div className="flex items-center">
                <div className="text-3xl sm:hidden" onClick={toggleSidebar}><TbMenu2 /></div>
                <div className="ml-4 text-2xl font-semibold">{navMessage}</div>
            </div>

            {/* Right side content */}
            {/* Small screen dot icon */}
            <div className="text-4xl cursor-pointer sm:hidden"><HiOutlineDotsVertical /></div>

            {/* Bigger screens */}
            <div className="relative hidden sm:flex items-center space-x-4">
                <input type="text" placeholder="Search people" className="px-4 py-2 rounded-md border" />
                <div className="text-4xl cursor-pointer" onClick={handleProfileClick}><CgProfile /></div>

                {/* Dropdown */}
                {showDropdown && (
                    <div ref={dropdownRef} className="absolute right-0 mt-12 w-48 bg-white border rounded-md shadow-lg z-10">
                        <div className="p-2 hover:bg-gray-200 cursor-pointer" onClick={navigate.profile}>Profile</div>
                        <div className="p-2 hover:bg-gray-200 cursor-pointer">Logout</div>
                    </div>
                )}
            </div>
        </div>
    );
}
