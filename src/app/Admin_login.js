import React from "react";
import AdminLogo from "../assets/Faculty_logo.jpg";
import Login from "../components/Login.js";

export default function Admin_login() {
  return (
    <div>
      <div className="flex h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div
            className="hidden md:block w-full"
            style={{ backgroundImage: `url(${AdminLogo})`, backgroundSize: "cover", backgroundPosition: "center" }}
          ></div>
          <Login />
        </div>
      </div>
    </div>
  );
}
