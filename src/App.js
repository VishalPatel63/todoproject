import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { CiSearch } from "react-icons/ci";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getTodo`);
  
      const result = await response.json();
  
      if (result.success) {
        setTodos(result.data); // Same as response.data.data in Axios
      } else {
        console.error("Failed to fetch todos:", result.message);
      }
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleUpdate = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
    );
  };
  const handleNewTodo = (todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };


  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
<div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-3xl space-y-10 border border-gray-200 transition-all duration-300 ease-in-out">
  <h1 className="text-4xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
    <span role="img" aria-label="clipboard" className="text-indigo-500 animate-pulse">📋</span>
    My To-Do List
  </h1>

      {/* 🔍 Search Bar */}
      <div className="w-full flex items-center justify-center">
  <div className="relative w-full md:w-2/3">
    <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      placeholder="Search your tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
    />
  </div>
</div>
  {/* Form Section */}
  <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl shadow-inner border border-gray-300 transition hover:shadow-lg duration-300">
    <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
      ✍️ Add a New Task
    </h2>
    <TodoForm onTodoCreated={handleNewTodo} />
  </div>

  {/* Todo List Section */}
<div className="space-y-4">
  {todos.length === 0 ? (
    <div className="text-center py-12 text-gray-400 text-lg italic tracking-wide">
      🚀 No todos yet. Start by adding one!
    </div>
  ) : filteredTodos.length === 0 ? (
    <div className="text-center py-12 text-red-500 text-lg  tracking-wide">
       No todos found matching your search.
    </div>
  ) : (
    <TodoList todos={filteredTodos} onDelete={handleDelete} onUpdate={handleUpdate} />
  )}
</div>
</div>


  );
};

export default App;

