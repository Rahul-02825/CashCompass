import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="p-4 ">
                    <h1>Content</h1>
                </div>
            </div>
        </div>
    );
}

export default App;
