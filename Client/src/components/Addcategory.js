import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Addaccounts = ({ isvisible, onClose }) => {
  const initialFormData = {
    name: "",
    type: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    console.log("Form submission started");

    try {
      const response = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL + "/api/addCategory"
            : process.env.REACT_APP_BACKEND_URL + "/api/addCategory"
        }`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      console.log(response.data);
      alert(response.data);
      setFormData(initialFormData);
      onClose();
    } catch (err) {
      console.error("Error in posting record:", err);
    } finally {
      setIsSubmitting(false);
      console.log("Submission finished");
    }
  };

  if (!isvisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#171717] p-5 rounded-lg shadow-lg max-w-md lg:max-w-xl md:max-w-md">
        <h2 className="text-2xl mb-4 text-white">Add Category</h2>
        {/* The handleSubmit is now directly attached to the form submission */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center text-white"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4">
            <div className="flex flex-col">
              <div className="px-3 text-white">Category Name</div>
              <input
                className="rounded-2xl p-3 m-2 bg-[#232323] lg:px-12"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <div className="px-3 text-white">Category type</div>
              <input
                className="rounded-2xl p-3 m-2 bg-[#232323] lg:px-12"
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
            
          </div>
          <div className="flex justify-end w-full">
            <button
              type="button"
              className="rounded-2xl px-6 py-2 mx-3 mt-5 lg:px-16 text-white font-semibold border border-white"
              onClick={onClose}
            >
              Cancel
            </button>

            {/* Submit button now submits the form */}
            <button
              className="rounded-2xl px-8 py-3 mx-2 mt-5 lg:px-16 bg-[#5D3288] text-white font-semibold"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addaccounts;
