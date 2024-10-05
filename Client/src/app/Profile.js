import {React,useState,useContext} from 'react'
import Usercontext from "../Middleware/Context";
import axios from 'axios'
import { CgProfile } from "react-icons/cg";
import Navbar from '../components/Navbar';



export default function Profile (){
    
    const {user}=useContext(Usercontext)
    const [defaultData,setDefaultData]=useState(user)
    const [isdisabled,setDisabled]=useState(true)
    const [hidden,sethidden]=useState('hidden')
    const [passwords,setPasswords]=useState({
        oldpassword:'',
        newpassword:''
    })


    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const editable=()=>{
        setDisabled(!isdisabled)
        sethidden('')
    }
    
    // const givemessage=()=>{

    //     if(isdisabled){
    //         alert('disabled,kindly select edit option')
    //     }
    // }
    const handleChange = (e) => {
        const { name, value } = e.target
        setDefaultData({
          ...defaultData,
          [name]: value
        });
      };
        const handlePasswordChange=(e)=>{
            const {name,value}=e.target
            setPasswords({
                ...passwords,
                [name]:value
            })
        }

      const handleSubmit = async (e) => {
        e.preventDefault();
        defaultData.oldpassword=passwords.oldpassword
        defaultData.password=passwords.newpassword
        console.log(defaultData)
        try {
          const response = await axios.put(`${
              process.env.NODE_ENV === "production"
                ? process.env.REACT_APP_PROD_URL+"/api/profileupdate"
                : process.env.REACT_APP_BACKEND_URL+"/api/profileupdate"
            }`, defaultData);
          alert("updated sucessfully")
          console.log(response.data);
        } catch (err) {
          console.error(err);   
        }
      };

    return (
        <div className='flex'>
            
                {/* display form */}
            <div className="flex">
                <div className="grid grid-cols-1 w-full">
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center">
                        <div className='m-3'>                     
                            {/* profile logo */}
                            <CgProfile style={{ fontSize: '144px' }} />
                        </div>
                            <form  className="w-full flex flex-col justify-center items-center">
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">  
                                        
                                        <input
                                            className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                                            type="text"
                                            name="username"
                                            value={defaultData.username}
                                            onChange={handleChange}
                                            placeholder="username"
                                            disabled={isdisabled}
                                        />
                                        <input
                                            className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                                            type="text"
                                            name="firstname"
                                            value={defaultData.firstname}
                                            onChange={handleChange}
                                            placeholder="Firstname"
                                            disabled={isdisabled}
                                        />
                                    
                                    <input
                                        className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                                        type="text"
                                        name="secondname"
                                        value={defaultData.secondname}
                                        onChange={handleChange}
                                        placeholder="Secondname"
                                        disabled={isdisabled}
                                    />
                                    <input
                                        className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                                        type="text"
                                        name="contact"
                                        value={defaultData.contact}
                                        onChange={handleChange}
                                        placeholder="Contact"
                                        disabled={isdisabled}
                                    />
                                    <input
                                        className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                                        type="email"
                                        name="email"
                                        value={defaultData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        disabled={isdisabled}
                                    />
                                    <input
                                        className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                                        type="number"
                                        name="income"
                                        value={defaultData.income}
                                        onChange={handleChange}
                                        placeholder="Income"
                                        disabled={isdisabled}
                                    />
                                    {/* password */}
                                    <input
                                        className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                                        type="text"
                                        name="oldpassword"
                                        value={passwords.oldpassword}
                                        onChange={handlePasswordChange}
                                        placeholder="oldpassword"
                                        disabled={isdisabled}
                                        required
                                    />
                                    <input
                                        className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                                        type="text"
                                        name="newpassword"
                                        value={passwords.newpassword}
                                        onChange={handlePasswordChange}
                                        placeholder="newpassword"
                                        disabled={isdisabled}
                                        required
                                    />
                                
                                </div>   
                                <div>
                                
                                <button
                                    className={`rounded-2xl px-10 py-3 mx-5 mt-5 lg:px-32 ${hidden} 
                                    bg-green-500 text-white font-semibold`} onClick={handleSubmit}>
                                    Submit
                                </button>
                                
                                </div>   
                                
                                        
                            </form>
                            <button
                                className="rounded-2xl px-10 py-3 mx-3 mt-5 lg:px-32
                                bg-blue-500 text-white font-semibold" onClick={editable}>
                                edit?
                            </button>
                        </div>
                    </div>
                </div>
            </div>        
            </div>
                  
    )
}
