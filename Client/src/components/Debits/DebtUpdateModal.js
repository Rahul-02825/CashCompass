import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateModal = ({ isVisible, onClose, id_ }) => {
  const initialFormData = {   
    id: id_,
    money: '',
  };
  //console.log(initialFormData)
  const mes=''

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(mes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('updata effect')
    setFormData({ ...formData, id: id_ });
    console.log(formData)
  }, [id_]);

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
      const response = await axios.put('https://cash-compass-server.vercel.app/api/debtupdate', formData);
      console.log(response.data)  
      setMessage(response.data)
      console.log(message)
      alert(response.data);
      setFormData(initialFormData); 
      onClose(); 
    } catch (err) {
      console.error('Error in updating record:', err);
    } finally {
      setIsSubmitting(false); 
      console.log('submission finished');
    }
  };

  if (!isVisible) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md lg:max-w-xl md:max-w-md">
        <h2 className="text-2xl mb-4">Update</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">         
            <input
              className="rounded-2xl p-3 m-2 bg-gray-100 lg:px-12"
              type="number"
              name="money"
              value={formData.money}
              onChange={handleChange}
              placeholder="Returned Debt"
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

export default UpdateModal;
