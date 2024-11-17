import { useState } from "react";
import TodoList from "./TodoList";

const Todo = () => {

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const handleInputChange  = (e) => {
    setTask(e.target.value);
  };

  const handleAddTodo  = (e) => {
    e.preventDefault();

    if (task.trim()) {
        const todoTasks = { id: Date.now(), task:task, isCompleted:false, isEditing:false }
        setTodos([...todos,todoTasks ]); 
        setTask(""); 
      }
  };  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-4">Todo List</h1>
        <form className="flex gap-2 mb-4" onSubmit={handleAddTodo}>
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="Add a task"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-cyan-600 text-white rounded-md"
          >
            Add
          </button>
        </form>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default Todo;