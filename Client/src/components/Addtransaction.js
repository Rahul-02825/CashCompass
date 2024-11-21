import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Addaccounts = ({ isvisible, onClose }) => {
  const [accountsdata, setaccountsdata] = useState([]);
  const [categoriesdata, setcategoriesdata] = useState([]);
  const initialFormData = {
    from: "",
    type: "",
    amount: "",
    group: "",
    description: "",
    date: "",
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

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        console.log("Fetching accounts...");

        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL
            : process.env.REACT_APP_BACKEND_URL;

        const responseaccounts = await axios.get(`${baseUrl}/api/getaccounts`, {
          withCredentials: true,
        });

        const responseCategories = await axios.get(
          `${baseUrl}/api/getCategory`,
          {
            withCredentials: true,
          }
        );

        console.log("Accounts fetched:", responseaccounts.data);
        console.log("Categories fetched:", responseCategories.data);
        setaccountsdata(responseaccounts.data);
        setcategoriesdata(responseCategories.data);
        console.log("after");
      } catch (err) {
        console.error("Error in getting accounts or category:", err);
      }
    };

    fetchAccounts(); // Call the function
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    console.log("Form submission started");

    console.log(formData.group)

    try {
      const response = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL + "/api/addtransactio"
            : process.env.REACT_APP_BACKEND_URL + "/api/addtransactio"
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
        <h2 className="text-2xl mb-4 text-white">Add Transaction</h2>
        {/* The handleSubmit is now directly attached to the form submission */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center text-white"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4">
            <div className="flex flex-col">
              <label htmlFor="from" className="px-3">From</label>
              <select
                name="from"
                id="from"
                className="bg-[#232323] rounded-2xl p-3 m-2 lg:px-12"
                value={formData.from}
                onChange={handleChange}
              >
                {accountsdata.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <div className="px-3 text-white">Date</div>
              <input
                className="rounded-2xl p-3 m-2 bg-[#232323] lg:px-12"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="group" className="px-3">Category</label>
              <select
                name="group"
                id="group"
                className="bg-[#232323] rounded-2xl p-3 m-2 lg:px-12"
                value={formData.group}
                onChange={handleChange}
              >
                {!Array.isArray(categoriesdata) ? (
                  <option>no category available</option> // Or Loading...
                ) : (
                  categoriesdata.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <div className="px-3 text-white">amount</div>
              <input
                className="rounded-2xl p-3 m-2 bg-[#232323] lg:px-12"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="w-full text-white text-left ml-12">Description</div>
          <input
            className="rounded-2xl p-3 mx-2  bg-[#232323] sm:w-full"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

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
