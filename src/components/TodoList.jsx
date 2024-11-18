import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const TodoList = ({ todos, toggleComplete,setTodos }) => {

  const handleDelete = (id) =>{
    const updatedTodos = todos.filter((item) => item.id !== id)
    setTodos(updatedTodos)
  }

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
            <p
              className={`text-gray-700 overflow-hidden  ${
                todoItem.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {todoItem.task}
            </p>

            <div className="flex gap-5 ">
              <button>
                <PencilIcon className="w-5 h-5" />
              </button>

              <button>
                <TrashIcon onClick={()=>handleDelete(todoItem.id)} className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
