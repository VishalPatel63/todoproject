import React, { useState } from 'react';


const TodoForm = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description) return;
  
    try {
      const createTodo = await fetch(
        `${process.env.REACT_APP_BASE_URL}/createTodo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );
  
      const result = await createTodo.json();
  
      if (result.success) {
        console.log("Todo created:", result.data);
        onTodoCreated(result.data); // Update list
        setTitle("");
        setDescription("");
      } else {
        console.error("Create failed:", result.message);
      }
    } catch (err) {
      console.error("Error while creating todo:", err);
    }
  };

  return (
<form onSubmit={handleSubmit} className="space-y-6">
  {/* Title Input */}
  <div className=''>

  <div className="flex flex-col gap-2">
  <label className="text-base font-medium text-gray-800 flex items-center gap-2">
    🏷️ <span>Title</span>
  </label>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Give your task a name..."
    className="w-full px-4 py-3 border border-gray-300 rounded-l text-gray-900 placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
  />
</div>


  {/* Description Input */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      📝 <span>Description</span>
    </label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Add extra details here ..."
      rows="2"
      className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
    />
  </div>
  </div>

  {/* Add Task Button */}
  <button
    type="submit"
    className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
  >
    ➕ Add Task
  </button>
</form>






  );
};

export default TodoForm;
