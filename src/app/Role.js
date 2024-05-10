import React from "react";
import { useNavigate } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { SiAdminer } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";


export default function Role() {
    
    const navigate = useNavigate();

    const handleClickAdmin = () => {
        navigate('/Adminlogin');
    }
    const handleClickStudent = () => {
        navigate('/Studentlogin');
    }
    const handleClickFaculty = () => {
        navigate('/Facultylogin');
    }

    return (
        <div className="flex flex-col mx-10 justify-center items-center md:h-screen">
            <div className="font-bold text-gray-800 text-center text-3xl pb-2 md:pb-10">Select your role</div>
            <div className="grid grid-cols-1 gap-3 md:gap-7 w-64 md:w-full md:grid-cols-3">
                <div onClick={handleClickAdmin}>
                    <div className="bg-teal-50 h-48 shadow-xl flex justify-center items-center">
                        <SiAdminer size={100} />
                    </div>
                    <p className=" pt-3 text-center font-bold md:pt-7">Admin</p>
                </div>
                <div onClick={handleClickStudent}>
                    <div className="bg-teal-50 h-48 shadow-xl flex justify-center items-center">
                    <PiStudentFill size={100} />
                    </div>
                    <p className="pt-3 text-center font-bold md:pt-7">Student</p>
                </div>
                <div onClick={handleClickFaculty}>
                    <div className="bg-teal-50 h-48 shadow-xl flex justify-center items-center">
                    <GiTeacher size={100} />
                    </div>
                    <p className=" text-center font-bold md:pt-7">Faculty</p>
                </div>
            </div>   
        </div>
    );
}
