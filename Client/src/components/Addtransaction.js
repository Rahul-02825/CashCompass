import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const AddTransaction = ({ isvisible, onClose }) => {
  const [accountsdata, setaccountsdata] = useState([]);
  const [categoriesdata, setcategoriesdata] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (accountsdata.length === 1) {
      setFormData((prev) => ({ ...prev, from: accountsdata[0]._id }));
    }
  }, [accountsdata]);
  
  useEffect(() => {
    if (categoriesdata.length === 1) {
      setFormData((prev) => ({ ...prev, group: categoriesdata[0]._id }));
    }
  }, [categoriesdata]);
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

  const initialFormData = {
    from: "",
    type: "income",
    amount: "",
    group: "",
    description: "",
    date: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  // validate accounts balance with user given amount validate it in backend
  const validate = async (accountsId,amount) => {
    const data={accountsId:accountsId,amount:amount}
    console.log(data)
    try {
      const validationResponse= await axios.put(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL + "/api/balanceValidator"
            : process.env.REACT_APP_BACKEND_URL + "/api/balanceValidator"
        }`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      console.log(validationResponse.data)
      return validationResponse.data.result

    } catch (err) {
      console.log("error in validation");
    }
    
  };

  // submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    console.log("Form submission started");

    console.log(formData.group);

    // checking wheather from(accounts) or category is empty
    if (formData.group === "") {
      setIsSubmitting(false);
      alert("add category before adding a transaction");
      return;
    }
    if (formData.from === "") {
      setIsSubmitting(false);
      alert("add accounts before adding a transaction");
      return
    }
    //validate accounts with balance
    const res=await validate(formData.from,formData.amount)
    if(!res){
      setIsSubmitting(false)
      alert("balance is less in the account")
      return
    }
    try {
      const response = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL + "/api/addtransaction"
            : process.env.REACT_APP_BACKEND_URL + "/api/addtransaction"
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
              <label htmlFor="from" className="px-3">
                From
              </label>
              <select
                name="from"
                id="from"
                className="bg-[#232323] rounded-2xl p-3 m-2 lg:px-12"
                value={formData.from}
                onChange={handleChange}
              >
                {accountsdata.length === 0 ? (
                  <option value="">No accounts available</option>
                ) : (
                  accountsdata.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))
                )}
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
              <label htmlFor="group" className="px-3">
                Category
              </label>
              <select
                name="group"
                id="group"
                className="bg-[#232323] rounded-2xl p-3 m-2 lg:px-12"
                value={formData.group}
                onChange={handleChange}
              >
                {categoriesdata.length === 0 ? (
                  <option value="">No categories available</option>
                ) : (
                  categoriesdata.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <div className="px-3 text-white">amount</div>
              <input
                className="rounded-2xl p-3 m-2 bg-[#232323] "
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="w-full text-white text-left ml-12 sm:ml-5">
            Description
          </div>
          <input
            className="rounded-2xl  p-3 mx-2 mt-2 bg-[#232323] sm:w-full"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col justify-end w-full">
            <div className="flex flex-col">
              <label htmlFor="type" className="px-3 ml-4 mt-2 sm:px-0 ">
                type
              </label>
              <select
                name="type"
                id="type"
                className="bg-[#232323] rounded-2xl p-3  my-1 mx-5 w-52 sm:w-1/3 sm:mx-0"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="income">income</option>
                <option value="expense">expense</option>
              </select>
            </div>
            <div className="flex">
              <button
                type="button"
                className="rounded-2xl px-6 py-1 mx-3 mt-5 lg:px-16 text-white font-semibold border border-white"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;