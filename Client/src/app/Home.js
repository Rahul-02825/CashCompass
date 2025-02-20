import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import BlurText from "../components/ui/BlurText";
import Usercontext from "../Middleware/Context";
import Aurora from "../components/ui/Aurora";

const Home = () => {
  const { user } = useContext(Usercontext);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Aurora as background */}
      <div className="absolute inset-0 z-0 h-2/3">
        <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.5} />
      </div>

      {/* Content goes here */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1 flex lg:ml-20 text-white w-screen flex-grow">
          <div className="mt-10 ml-10 font-bold">
            <BlurText
              text={user ? `Hello ${user.username}!!` : `Hello Guest`}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl lg:text-6xl mb-8"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto">
          <Navbar />
        </footer>
      </div>
    </div>
  );
};

export default Home;
