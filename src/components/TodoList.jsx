import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

const TodoList = ({ todos, toggleComplete, setTodos, errorMessage, setErrorMessage  }) => {
  
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [newTask, setNewTask] = useState("");
 

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id, currentTask) => {
    setEditingTodoId(id);
    setNewTask(currentTask);
    setErrorMessage(""); 
  };

  const handleSaveEdit = (id) => {
     setErrorMessage("");
    if (newTask.trim() === "") {
      setErrorMessage("Task cannot be empty!");
      return;
    }
    if (todos.some((todo) => todo.task === newTask && todo.id !== id)) {
      setErrorMessage("This task already exists.");
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: newTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setNewTask("");
  };


  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks added yet</p>
      ) : (
        todos.map((todoItem) => (
          <div
            key={todoItem.id}
            className="flex items-center justify-between p-3 mb-3 bg-white border border-gray-200 rounded-md"
          >
            <input
              type="checkbox"
              checked={todoItem.isCompleted}
              onChange={() => toggleComplete(todoItem.id)}
              className="mr-3"
            />
            {editingTodoId === todoItem.id ? (
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onBlur={() => handleSaveEdit(todoItem.id)}
                autoFocus
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
              />
            
            ) : (
              <p
                className={`text-gray-700 overflow-hidden ${
                  todoItem.isCompleted ? "line-through text-gray-400" : ""
                }`}
              >
                {todoItem.task}
              </p>
            )}

            <div className="flex gap-5">
              <button
                onClick={() => handleEdit(todoItem.id, todoItem.task)}
              >
                <PencilIcon className="w-10 h-5" />
              </button>

              <button
                onClick={() => handleDelete(todoItem.id)}
              >
                <TrashIcon className="w-10 h-5" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
