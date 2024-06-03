import React from "react";

function Login(){
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

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:9001/api/user', formData);
          setMessage('User created successfully!');
          console.log(response.data);
        } catch (err) {
          setMessage('Error creating user');
          console.error(err);
        }
      };
        
      
    return(
    <div>
      <div className="flex h-screen">
          <div className="grid grid-cols-2  w-full">
                  <h1 className="text-center text-2xl font-bold py-8 text-gray-600 md:text-3xl">Member Login</h1>
                  <div className="w-full flex flex-col justify-center items-center">
                      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                          <input 
                              className="rounded-2xl p-3 m-5 bg-gray-100 lg:px-16"
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              placeholder="Username"
                              required
                          />
                          <input 
                              className="rounded-2xl p-3 mx-5 bg-gray-100 lg:px-16" 
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Password"
                              required
                          />
                          <input 
                              className="rounded-2xl p-3 mx-5 bg-gray-100 lg:px-16" 
                              type="password"
                              name="password"
                              value={formData.firstname}
                              onChange={handleChange}
                              placeholder="Password"
                              required
                          />
                          <input 
                              className="rounded-2xl p-3 mx-5 bg-gray-100 lg:px-16" 
                              type="password"
                              name="password"
                              value={formData.secondname}
                              onChange={handleChange}
                              placeholder="Password"
                              required
                          />
                          <input 
                              className="rounded-2xl p-3 mx-5 bg-gray-100 lg:px-16" 
                              type="password"
                              name="password"
                              value={formData.contact}
                              onChange={handleChange}
                              placeholder="Password"
                              required
                          />
                          <input 
                              className="rounded-2xl p-3 mx-5 bg-gray-100 lg:px-16" 
                              type="password"
                              name="password"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Password"
                              required
                          />
                          <input 
                              className="rounded-2xl p-3 mx-5 bg-gray-100 lg:px-16" 
                              type="password"
                              name="password"
                              value={formData.income}
                              onChange={handleChange}
                              placeholder="Password"
                              required
                          />
                          <button 
                              className="rounded-2xl px-20 py-3 mx-5 mt-5 lg:px-32 bg-green-500 text-white font-semibold" 
                              type="submit"
                          >
                              REGISTER
                          </button>
                      </form>
                      <p className="text-gray-500 mt-5">Forgot password?</p>
                      {message && <p>{message}</p>}
                  </div>
          </div>
      </div>
  </div>
    )
}
export default Login;