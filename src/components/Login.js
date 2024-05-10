import React from "react";

function Login(){
    return(
        <div className="w-full flex flex-col justify-center items-center h-full">
            <h1 className="text-center text-2xl font-bold py-8 text-gray-600">Member Login</h1>
            <div className="w-full flex flex-col justify-center items-center">
              <input className="rounded-2xl p-3 m-5 bg-gray-100 lg:px-10" type="text" placeholder="ID:" />
              <input className="rounded-2xl p-3 mx-5 bg-gray-100 lg:px-10" type="password" placeholder="Password:" />
              <button className="rounded-2xl px-20 py-3 mx-5 mt-5 lg:px-30 bg-green-500 text-white font-semibold">LOGIN</button>
              <p className="text-gray-500 mt-5">Forgot password?</p>
            </div>
          </div>
    )
}
export default Login;