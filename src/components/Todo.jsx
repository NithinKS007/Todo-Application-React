import { useEffect, useState } from "react";
import TodoList from "./TodoList";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [todos]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setErrorMessage("Task cannot be empty!");
      return;
    }

    if (todos.some((todo) => todo.task === task)) {
      setErrorMessage("This task already exists.");
      return;
    }

      const newTodo = {
        id: Date.now(),
        task: task,
        isCompleted: false,
        isEditing: false,
      };
      setTodos([...todos, newTodo]);
      setTask("");
      setErrorMessage("");
      localStorage.setItem("todos", JSON.stringify(todos));
    
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.isCompleted).length;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-1/2">
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Todo List
        </h1>
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Completed:</span> {completedTasks} |{" "}
            <span className="font-semibold">Total:</span> {totalTasks}
          </p>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
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
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          setTodos={setTodos}
          errorMessage={errorMessage} 
          setErrorMessage={setErrorMessage}
        />
      </div>
    </div>
  );
};

export default Todo;
