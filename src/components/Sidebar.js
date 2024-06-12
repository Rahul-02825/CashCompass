import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`fixed top-0 left-0 h-full sm:h-screen w-48 sm:w-36 md:w-48 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform sm:translate-x-0 sm:static overflow-y-auto`}>
            <button onClick={toggleSidebar} className="m-4 sm:hidden">
                ✕
            </button>
            <nav className="mt-4">
                <a href="#services" className="block p-4 hover:bg-gray-700">Debt Chart</a>
                <a href="#contact" className="block p-4 hover:bg-gray-700">Credit Chart</a>
            </nav>
        </div>
    );
};

export default Sidebar;
