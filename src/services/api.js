import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async () => {
  var config = {
    method: "get",
    url: `${API_URL}/tasks`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    return err;
  }
};

export const createTask = async (newTaskData) => {
  var config = {
    method: "post",
    url: `${API_URL}/tasks`,
    headers: {
      "Content-Type": "application/json",
    },
    data: newTaskData,
  };
  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateTask = async (taskId, updatedTaskData) => {
  var config = {
    method: "put",
    url: `${API_URL}/tasks/${taskId}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: updatedTaskData,
  };
  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteTask = async (taskId) => {
var config = {
    method: "delete",
    url: `${API_URL}/tasks/${taskId}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    return err;
  }
};

export default api;
