import {React} from 'react';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {

    const navigateDebt=useNavigate()
    const navigate={
        debtchart:function(){
            navigateDebt('../debt')
        }
    }

    return (
        <div className={`fixed top-0 left-0 h-full sm:h-screen w-48 sm:w-36 md:w-48 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform sm:translate-x-0 sm:static overflow-y-auto`}>
            <button onClick={toggleSidebar} className="m-4 sm:hidden">
                ✕
            </button>
            <nav className="mt-4">
                <div className="block p-4 hover:bg-gray-700" onClick={navigate.debtchart}>Home</div>
                <div className="block p-4 hover:bg-gray-700" onClick={navigate.debtchart}>Debt Chart</div>
                <div className="block p-4 hover:bg-gray-700" onClick={navigate.debtchart}>credit Chart</div>
            </nav>
        </div>
    );
};

export default Sidebar;
