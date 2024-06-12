import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FaFilter } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";


import UpdateModal from './DebtUpdateModal';

const DebtTable = () => {
    const [responsedata, setResponsedata] = useState({
        all: [],
        completed: [],
        pending: []
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const [itemid, setid] = useState(null);
    const [showfilter, setfilter] = useState(false);


    const initalfilterdata='pending'
    const [filter,filterset]=useState(initalfilterdata)

    useEffect(() => {
        const fetchDebtUser = async () => {
            try {
                const response = await axios.get('http://localhost:9001/api/historydebts', { withCredentials: true });
                setResponsedata(response.data);
                //console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        fetchDebtUser();

        const intervalId = setInterval(fetchDebtUser, 4000); // Poll every 4 seconds

        return () => clearInterval(intervalId); //clean up function return to original
    }, []);

    const handleAddClick = (id) => {
        setModalVisible(true);
        setid(id);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };
    

    const filterClick = () => {
        setfilter(!showfilter);
    };

    const filterSet=(filteroption)=>{
        filterset(filteroption)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                <h1 className="text-2xl font-bold m-4">Debt History</h1>
                {/* filter options code */}
                <div className="flex flex-col">
                    {/* filter div*/}
                    <div className="ml-4 mt-4 mb-2 shadow-md px-5 py-3 flex cursor-pointer" onClick={filterClick}>
                        <div className="p-2"><FaFilter /></div>
                        <div className="p-1">{filter}</div>
                        <div className="p-2"><FaAngleDown /></div>               
                    </div>
                    <div>
                        {/* filter Dropdown */}
                        {showfilter && (
                        <div className="absolute left-58 w-36 md:w-48 bg-white border rounded-md shadow-lg z-10 " onClick={filterClick}>
                            <div className="p-2 hover:bg-gray-200 cursor-pointer" onClick={()=>filterSet('all')}>history(all)</div>
                            <div className="p-2 hover:bg-gray-200 cursor-pointer"onClick={()=>filterSet('pending')}>pending status</div>
                            <div className="p-2 hover:bg-gray-200 cursor-pointer"onClick={()=>filterSet('completed')}>completed</div>
                        </div>
                        )}        
                    </div>
                </div>          
            </div>
            {/* Largen screens in table form */}
            <div className="overflow-auto max-h-[450px] border border-gray-200 rounded-lg shadow-lg hidden md:block md:max-w-full z-5">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Debt Date
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Donor Firstname
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Donor Secondname
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Donor Contact
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Donor Email
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Debt Money
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {responsedata[filter].map((item, index) => (
                            <tr key={index}>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.curdate}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.firstname}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.secondname ? item.secondname : <div className="text-red-400">Not Provided</div>}
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
                                    {item.debtstatus === 'true' ? (
                                        <div className="text-green-400">{item.debtstatus}</div>
                                    ) : (
                                        <div className="text-red-400">{item.debtstatus}</div>
                                    )}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="bg-green-400 rounded-lg px-3 py-3 text-black" onClick={() => handleAddClick(item._id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* on small screens in card form */}
            <div className="md:hidden m-2 sm:overflow-auto max-h-[450px]">
                {responsedata[filter].map((item,index)=>(
                    <div key={index} className="shadow-lg m-5 flex flex-col">
                        {/* content in each card */}
                        <div className="p-4 ">{item.curdate}</div>
                        <div className="p-4">{item.firstname}</div>
                        <div className="p-4">
                            {item.secondname ? item.secondname : <div className="text-red-400">Not Provided</div>}
                        </div>
                        <div className="p-4">
                            {item.email ? item.email : <div className="text-red-400">Not Provided</div>}
                        </div>
                        <div className="p-4">{item.contact}</div>
                        <div className="p-4">{item.money}</div>
                        <div className="p-4">
                            {item.debtstatus === 'true' ? (
                                <div className="text-green-400">{item.debtstatus}</div>
                                ) : (
                                 <div className="text-red-400">{item.debtstatus}</div>
                                )}
                        </div>
                        
                    </div>
                ))}
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
