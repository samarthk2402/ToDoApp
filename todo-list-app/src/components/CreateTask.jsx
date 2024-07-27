import { useState } from "react";

const CreateTask = ({ callback }) => {
  const BASE_URL = "http://127.0.0.1:8000/api/";
  const [task, setTask] = useState("");

  const handleNewTask = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task,
      }),
    };

    fetch(BASE_URL + "create-task", options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Post request failed!");
        }
      })
      .then((data) => {
        console.log(data);
        setTask("");
        callback();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card card-body">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Task Name
          </label>
          <input
            value={task}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="e.g Maths homework"
            onChange={handleNewTask}
          />
        </div>
      </form>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default CreateTask;
