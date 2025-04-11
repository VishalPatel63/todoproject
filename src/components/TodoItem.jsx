import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/updateTodo/${todo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedTitle,
            description: editedDescription,
          }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        onUpdate(todo._id, data.data);  // <-- Correct this line
        setIsEditing(false);
      } else {
        console.error("Update failed:", data.message);
      }
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteTodo/${todo._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDelete(todo._id);  // let parent handle removing from list
      } else {
        const data = await response.json();
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition hover:shadow-xl">
  {isEditing ? (
    <>
      <input
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 mb-2"
        placeholder="Task title"
      />
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        rows="3"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        placeholder="Task description"
      ></textarea>
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
        >
          <CiSaveDown2 /> Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400 transition"
        >
            <MdOutlineCancel /> Cancel
        </button>
      </div>
    </>
  ) : (
    <>
      <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
      <p className="text-gray-600 mt-1">{todo.description}</p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <CiEdit /> Edit
        </button>
        <button
           onClick={handleDelete}
          className="text-red-600 hover:underline flex items-center gap-1"
        >
           <MdDelete /> Delete
        </button>
      </div>
    </>
  )}
</div>


  );
};

export default TodoItem;

