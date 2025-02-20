import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import BlurText from "../components/ui/BlurText";
import Usercontext from "../Middleware/Context";
import Aurora from "../components/ui/Aurora";
import DoughnutChart from "../components/stats/DoughnutChart";
import LineChart from "../components/stats/LineChart";
const Home = () => {
  const { user } = useContext(Usercontext);
  // doughnut chart
  const datadoughnut = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Expense Distribution",
        data: [300, 400], // Example amounts
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverOffset: 4, // Creates a hover effect
      },
    ],
  };
  // line chart
  const dataLine = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income ($)",
        data: [5000, 7000, 8000, 12000, 15000, 20000], // Income data
        borderColor: "#36A2EB", // Blue color for Income
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue fill
        pointBackgroundColor: "#fff",
        pointBorderColor: "#36A2EB",
        borderWidth: 2,
        fill: false, // No fill under the line
      },
      {
        label: "Expense ($)",
        data: [3000, 4000, 6000, 9000, 12000, 15000], // Expense data
        borderColor: "#FF6384", // Red color for Expense
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Light red fill
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF6384",
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  const optionsLine = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative w-screen h-screen flex flex-col overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 h-2/3">
        <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.5} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full text-white">
        {/* Greeting Section */}
        <div className="mt-5 ml-10 font-bold text-center">
          <BlurText
            text={user ? `Welcome ${user.username}!!` : `Hello Guest`}
            delay={150}
            animateBy="words"
            direction="top"
            className=" text-3xl lg:text-6xl mb-8"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 max-h-[65vh] lg:max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
            {/* Doughnut Chart */}
            <div className="w-[250px] h-[300px] mx-auto">
              <h2 className="text-xl font-bold text-center my-4">
                Expense Chart
              </h2>
              <DoughnutChart chartData={datadoughnut} />
            </div>

            {/* Line Chart */}
            <div className="w-3/4 mx-auto">
              <h2 className="text-xl font-bold text-center my-4">
                Income vs. Expense Over Time
              </h2>
              <LineChart chartData={dataLine} options={optionsLine} />
            </div>
          </div>
          {/* Doughnut Chart */}
          <div className="w-[250px] h-[300px] mx-auto">
            <h2 className="text-xl font-bold text-center my-4">
              Expense Chart
            </h2>
            <DoughnutChart chartData={datadoughnut} />
          </div>
        </div>

        {/* Fixed Footer (Navbar) */}
        <footer className="h-16 mt-14 md:mt-0">
          <Navbar />
        </footer>
      </div>
    </div>
  );
};

export default Home;
