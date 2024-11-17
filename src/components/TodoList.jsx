const TodoList = ({ todos }) => {
  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks added yet</p>
      ) : (
        todos.map((todoItem) => {
          return (
            <div
              key={todoItem.id}
              className="flex items-center justify-between p-3 mb-3 bg-white border border-gray-200 rounded-md"
            >
              <p  className="text-gray-700">{todoItem.task}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodoList;
