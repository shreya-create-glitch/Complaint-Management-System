
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthPage = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "signup";

    try {
      const toastId = toast.loading("Please wait...");
      const res = await axios.post(
        `http://localhost:1000/user/${endpoint}`,
        formdata
      );

      toast.dismiss(toastId); 

      
      toast.success(res.data.message || "Success!");

      
    localStorage.setItem("role", res.data.user.role);
   localStorage.setItem("email",res.data.user.email);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user?.id);

      onClose(); 
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Signup"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={formdata.username}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formdata.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formdata.password}
          onChange={handleChange}
          required
        />

        

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 ml-1 hover:underline"
        >
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
