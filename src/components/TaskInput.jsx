import { useState } from "react";
import { createTask } from "../services/api";
import ErrorCard from "./ErrorCard";

const TaskInput = (props) => {
  const [inputTitleString, setInputTitleString] = useState("");
  const [inputDescriptionString, setInputDescriptionString] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const inputTitleChangeHandler = (e) => {
    setInputTitleString(e.target.value);
  };

  const inputDescriptionChangeHandler = (e) => {
    setInputDescriptionString(e.target.value);
  };

  const addTaskButtonHandler = async () => {
    const trimmedTitleString = inputTitleString.trim();
    const trimmedDescriptionString = inputDescriptionString.trim();
    if (
      trimmedTitleString.length === 0 ||
      trimmedDescriptionString.length === 0
    ) {
      return;
    }

    const newTaskData = {
      title: trimmedTitleString,
      description: trimmedDescriptionString,
      completed: false,
    };

    const res = await createTask(newTaskData);

    if (res.status === 201) {
      props.setTodoItems((prevState) => [res.data, ...prevState]);
      setInputTitleString("");
      setInputDescriptionString("");
    } else {
      setErrorMessages(res.response.data.error);
    }
  };

  return (
    <div>
      <div className="my-6 flex items-center">
        <div className="flex flex-col mr-4">
          <label htmlFor="Title" className="text-gray-600">
            Title
          </label>
          <input
            type="text"
            className="bg-white border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 py-2 px-3 focus:outline-none"
            placeholder="Enter Task..."
            onChange={inputTitleChangeHandler}
            value={inputTitleString}
          />
        </div>

        <div className="flex flex-col mr-4">
          <label htmlFor="Description" className="text-gray-600">
            Description
          </label>
          <input
            type="text"
            className="bg-white border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 py-2 px-3 focus:outline-none"
            placeholder="Enter Description..."
            onChange={inputDescriptionChangeHandler}
            value={inputDescriptionString}
          />
        </div>

        <button
          className="px-8 text-base font-medium leading-6 text-white bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={addTaskButtonHandler}
        >
          Add Task
        </button>
      </div>
      {errorMessages.length !== 0 && (
        <ErrorCard errorMessages={errorMessages} />
      )}
    </div>
  );
};

export default TaskInput;
