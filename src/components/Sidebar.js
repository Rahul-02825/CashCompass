import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`fixed top-0 left-0 h-screen w-48 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:static`}>
            <button onClick={toggleSidebar} className="m-4 lg:hidden">
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
