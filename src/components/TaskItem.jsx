import { updateTask, deleteTask } from "../services/api";

const TaskItem = (props) => {
  const titleClickHandler = async () => {
    const updatedCompletedStatus = !props.completed;
    const updatedTask = { completed: updatedCompletedStatus };

    const res = await updateTask(props.id, updatedTask);
    console.log(res);
    if (res.status === 200) {
      props.setTodoItems((prev) => {
        return prev.map((data) => {
          if (data.id === props.id) {
            return {
              ...data,
              completed: updatedCompletedStatus,
            };
          }
          return data;
        });
      });
    }
  };

  const removeButtonClickHandler = async () => {
    const res = await deleteTask(props.id);

    if (res.status === 200) {
      props.setTodoItems((prev) => prev.filter((data) => data.id !== props.id));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center my-4">
      <div
        className={`flex-1 text-lg text-gray-700 font-semibold ${
          props.completed ? "line-through italic text-gray-600" : ""
        }`}
        onClick={titleClickHandler}
      >
        <p className="text-xl font-semibold">{props.title}</p>
        <p className="text-sm text-gray-600 ">{props.description}</p>
      </div>
      <button
        className="ml-4 px-3 py-2 text-sm font-medium leading-5 text-white bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={removeButtonClickHandler}
      >
        Remove
      </button>
    </div>
  );
};

export default TaskItem;
