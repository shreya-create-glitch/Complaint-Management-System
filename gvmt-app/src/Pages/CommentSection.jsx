import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentSection = ({ complaintId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:1000/comment/${complaintId}`);
    setComments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:1000/comment/${complaintId}`, { text }, {
      headers: {
  authorization: `Bearer ${localStorage.getItem("token")}`,
},

    });
    setText("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [complaintId]);

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold">Comments</h3>

      <form onSubmit={handleSubmit} className="flex gap-2 my-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment"
          className="border p-2 flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Post</button>
      </form>

      {comments.map(comment => (
        <div key={comment._id} className="border-b py-2">
          <strong>{comment.user.username}:</strong> {comment.text}
          <div className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;


