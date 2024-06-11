import React, { useEffect, useState } from "react";
import axios from 'axios';
import UpdateModal from './DebtUpdateModal';

const DebtTable = () => {
    const [responsedata, setResponsedata] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [itemid, setid] = useState(null);

    useEffect(() => {
        const fetchdebtuser = async () => {
            try {
                const response = await axios.get('http://localhost:9001/api/historydebts', { withCredentials: true });
                setResponsedata(response.data);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        fetchdebtuser();

        const intervalId = setInterval(fetchdebtuser, 2000); // Poll every 2 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const handleAddClick = (id) => {
        setModalVisible(true);
        setid(id);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <div className="container mx-auto p-4">
            <div>
                <h1 className="text-2xl font-bold mb-4">Debt History</h1>

                {/* filter option */}
                <div>

                </div>
            
            </div>
            <div className="overflow-auto max-h-[450px] border border-gray-200 rounded-lg shadow-lg hidden md:block md:max-w-full">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-3 py-3 text-left text-xs  font-semibold text-black uppercase tracking-wider">
                                Donor Firstname
                            </th>
                            <th className="px-3 py-3 text-left text-xs  font-semibold text-black uppercase tracking-wider">
                                Donor Secondname
                            </th>
                            <th className="px-3 py-3 text-left text-xs  font-semibold text-black uppercase tracking-wider">
                                Donor Contact
                            </th>
                            <th className="px-3 py-3 text-left text-xs  font-semibold text-black uppercase tracking-wider">
                                Donor Email
                            </th>
                            <th className="px-3 py-3 text-left text-xs  font-semibold text-black uppercase tracking-wider">
                                Debt Money
                            </th>
                            <th className="px-3 py-3 text-left text-xs  font-semibold text-black uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-3 py-3 text-left text-xs  font-semibold text-black uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {responsedata.map((item, index) => (
                            <tr key={index}>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.firstname}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.secondname ? item.secondname : '-'}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.contact}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.email ? item.email : <div className="text-red-400">Not Provided</div>}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.money}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm">
                                    {item.debtstatus==='true'?(<div className="text-green-400">{item.debtstatus}</div>):(<div className="text-red-400">{item.debtstatus}</div>)}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="bg-green-400 rounded-lg px-3 py-3 text-black" onClick={() => handleAddClick(item._id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UpdateModal 
                isVisible={isModalVisible}
                onClose={handleModalClose}
                id_={itemid}
            />
        </div>
    );
};

export default DebtTable;
