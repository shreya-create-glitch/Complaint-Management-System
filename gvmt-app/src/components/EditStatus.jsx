import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:1000/complaint/${id}`,
        { status },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Status updated!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };



  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Complaint Status</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Select Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        >
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditStatus;
