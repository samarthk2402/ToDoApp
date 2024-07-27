import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CreateTask from "./components/CreateTask";
import "./App.css";

function App() {
  const BASE_URL = "http://127.0.0.1:8000/api/";
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(BASE_URL + "get-tasks", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.tasks);
        setTasks(data.tasks);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDeleteTask = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(BASE_URL + "delete-task/" + id.toString(), options)
      .then((response) => response.json())
      .then((data) => {
        getTasks();
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1 className="mt-3">To Do List</h1>

      <h3 className="mt-4">Tasks: </h3>

      <ul className="list-group mt-2">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <input
              className="form-check-input me-1 mr-3"
              type="checkbox"
              value=""
              id="firstCheckbox"
              onClick={() => handleDeleteTask(task.id)}
            />
            <label className="form-check-label" htmlFor="firstCheckbox">
              {task.name}
            </label>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-secondary mt-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#newTaskForm"
        aria-expanded="false"
        aria-controls="newTaskForm"
      >
        Create new task
      </button>
      <div className="collapse mt-5" id="newTaskForm">
        <CreateTask callback={getTasks} />
      </div>
    </div>
  );
}

export default App;
