

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPage from '../components/AuthPage';
import { toast } from 'react-hot-toast';
import ShowComplaint from './showComplaint';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("email");
  const role = localStorage.getItem("role"); 

  const categories = ['All', 'Garbage', 'Road', 'Water', 'Electricity', 'Others'];

  useEffect(() => {
    if (!token) {
      setOpen(true);
    }
  }, [token]);

  const handleLogin = () => {
    if (!token) {
      setOpen(true);
    } else {
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      setTimeout(() => window.location.reload(), 1000); // Give time for toast to show
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-4 relative">

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <AuthPage onClose={() => setOpen(false)} />
        </div>
      )}

      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={handleLogin}
          className="text-blue-600 font-medium text-lg hover:underline"
        >
          {/* {token ? `Logout  (${user})` : "Login"} */}
           {token ? `Logout (${role === "admin" ? "admin: " : ""}${user})` : "Login"}


        </button>
        <div className="text-blue-700 font-bold text-2xl">SamajhSeva</div>
      </div>

      {/* Center Title & Button */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Write your complaint and help your locality
        </h2>
        <button
          onClick={() => {
            if (token) {
              navigate("/complaint"); // Navigate to complaint form
            } else {
              setOpen(true); // show login if not logged in
            }
          }}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl"
        >
          Report Problem
        </button>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories */}
        <div className="w-full md:w-1/4 bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white shadow-md'
                      : 'bg-white text-gray-800 hover:bg-blue-100'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Reported Problems */}
        <div className="w-full md:w-3/4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Reported Problems</h3>
          <ShowComplaint selectedCategory={selectedCategory} />
        </div>
      </div>

      {/* Show Auth Modal Again */}
      {open ? <AuthPage /> : ""}
    </div>
  );
};

export default Home;



