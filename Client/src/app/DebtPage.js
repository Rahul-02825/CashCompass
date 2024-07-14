import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ModalDebt from '../components/Debits/AddDebt';
import DebtRecord from '../components/Debits/DebtRecord';


//import axios from 'axios';
//import { FaPlus } from "react-icons/fa";



function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const handleAddClick = () => {
        setModalVisible(true);
      };
    
      const handleModalClose = () => {
        setModalVisible(false);
      };
    

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1">
                <Navbar toggleSidebar={toggleSidebar} 
                    message='Debt Records'
                 />

                {/*Content for debtpage */}
                 
                <div className="p-4 ">
                <button
                    onClick={handleAddClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded flex justify-around">
                    Add Debtdata
                    {/* <div className='ml-2 mt-2'><FaPlus /></div> */}
                </button>
                <ModalDebt
                    isVisible={isModalVisible}
                    onClose={handleModalClose}
                />
                <DebtRecord/>
                
                </div>
            </div>
        </div>
    );
}

export default App;