import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    secondname: '',
    contact: '',
    email: '',
    income: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cash-compass-server.vercel.app/api/user', formData);
      setMessage('User created successfully!');
      alert("User created succesfully")
      console.log(response.data);
    } catch (err) {
      setMessage('Error creating user');
      console.error(err);
    }
    await navigate('/')
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="grid grid-cols-1 w-full">
          <div className="w-full flex flex-col justify-center items-center h-full">
            <h1 className="text-center text-2xl font-bold py-8 text-gray-600 md:text-3xl">Register</h1>
            <div className="w-full flex flex-col justify-center items-center">
              <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                  <input
                    className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                  />
                  <input
                    className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <input
                    className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Firstname"
                    required
                  />
                  <input
                    className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                    type="text"
                    name="secondname"
                    value={formData.secondname}
                    onChange={handleChange}
                    placeholder="Secondname"
                  />
                  <input
                    className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Contact"
                    required
                  />
                  <input
                    className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                  <input
                    className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    placeholder="Income"
                    required
                  />
                </div>
                <button
                  className="rounded-2xl px-20 py-3 mx-5 mt-5 lg:px-32 bg-green-500 text-white font-semibold"type="submit">
                  REGISTER
                </button>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
