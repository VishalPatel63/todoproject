import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete,onUpdate  }) => {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-2">
  {todos.map((todo) => (
    <TodoItem
      key={todo._id}
      todo={todo}
      onDelete={onDelete}
      onUpdate={onUpdate}
    />
  ))}
</div>
  );
};

export default TodoList;
