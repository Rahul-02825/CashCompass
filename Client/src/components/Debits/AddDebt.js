import React, { useState } from 'react';
import axios from 'axios';


const Modal = ({ isVisible, onClose }) => {
  const initialFormData = {
    firstname: '',
    secondname: '',
    email: '',
    contact: '',
    money: '',
    enddate: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    console.log('Form submission started');
    try {
      const response = await axios.post('https://cash-compass-server.vercel.app/api/donor', formData);
      alert("Record created successfully");
      setFormData(initialFormData); 
      onClose(); 
    } catch (err) {
      console.error('Error creating record:', err);
      setMessage('Error creating record');
    } finally {
      setIsSubmitting(false); 
      console.log('Form submission finished');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md lg:max-w-xl md:max-w-md">
        <h2 className="text-2xl mb-4">Add Data</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
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
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
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
              type="number"
              name="money"
              value={formData.money}
              onChange={handleChange}
              placeholder="Debt money"
              required
            />
            <input
              className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-16"
              type="date"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              placeholder="Debt End date"
              required
            />
          </div>
          <div className="flex justify-end w-full">
            <button type="button" onClick={onClose} className="rounded-2xl px-6 py-2 mx-3 mt-5 lg:px-16 bg-blue-400 text-white font-semibold">Cancel</button>
            <button
              className="rounded-2xl px-8 py-3 mx-2 mt-5 lg:px-16 bg-green-500 text-white font-semibold"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
        {message && <div className="text-center mt-4">{message}</div>}
      </div>
    </div>
  );
};

export default Modal;
