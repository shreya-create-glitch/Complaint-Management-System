
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import CommentSection from "./CommentSection";

const ShowComplaint = ({selectedCategory}) => {
  const navigate=useNavigate();
  const [data, setData] = useState([]);
const [userrole,setrole]=useState("");
const token=localStorage.getItem('token');
const userId=localStorage.getItem("userId");
useEffect(()=>{
setrole(localStorage.getItem('role'))
},[]);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:1000/complaint");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);
const handleEdit=(id)=>{
navigate(`/edit/${id}`);
}

const handleIncreaseCount=async(id)=>{
try {
await axios.put(`http://localhost:1000/complaint/count/${id}`,{},{
  headers:{
    authorization:`Bearer ${token}`,
  },
})
 const res = await axios.get("http://localhost:1000/complaint");
    setData(res.data);

} catch (error) {
 console.error("Error increasing count:", error.response?.data || error.message);

}
}

const filteredComplaints=selectedCategory==="All"?data:data.filter((item)=>item.category===selectedCategory);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800"> Complaints</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComplaints.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow border hover:shadow-lg transition-shadow duration-300"
          >
            {item.image && (
              <img
                src={`http://localhost:1000/${item.image}`}
                alt="complaint"
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            )}

            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Posted by:</strong> {item.user?.username || "Unknown"}
              </p>

              <h3 className="text-xl font-semibold text-blue-700">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.description}</p>

              <div className="flex flex-wrap gap-2 text-sm mt-2">
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                   {item.locality}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                   {item.category}
                </span>
                <span
                  className={`px-2 py-1 rounded-full ${
                    item.status === "resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>

 <span
  className={`px-2 py-1 rounded-full text-xs font-medium ${
    item.user?.badge === "Gold"
      ? "bg-yellow-500 text-white"
      : item.user?.badge === "Silver"
      ? "bg-gray-400 text-white"
      : item.user?.badge === "Bronze"
      ? "bg-orange-500 text-white"
      : "bg-gray-100 text-gray-500 border border-gray-300"
  }`}
>
  {item.user?.badge
    ? `🏅 ${item.user.badge} Badge`
    : "No Badge"}
</span>





                <CommentSection complaintId={item._id}></CommentSection>
                
              </div>

              <p className="text-xs text-gray-400 mt-2">
                 Created: {new Date(item.createdAt).toLocaleString()}
              </p>
              {userrole === "admin" && (
  <button
    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-full transition"
    onClick={() => handleEdit(item._id)}
  >
    ✏️ Edit Status
  </button>
 
)}

 

{
  userId !=item.user?._id &&(
    <button
                  className="mt-2 bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded-full transition"
                  onClick={() => handleIncreaseCount(item._id)}
                >
                  👍 Upvote ({item.count || 0})
                </button>
  )
}

            </div>
          </div>
        ))}
      </div>
        
      {data.length === 0 && (
        <p className="text-center text-gray-600 mt-10">No complaints found.</p>
      )}
      
    </div>
  );
};

export default ShowComplaint;



