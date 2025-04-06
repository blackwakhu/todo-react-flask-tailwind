import { useEffect, useState } from "react";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  useEffect(function () {
    const fetchData = function () {
      fetch("http://localhost:5000/tasks")
        .then((res) => res.json())
        .then((data) => setTasks(data.data))
        .catch((err) => console.error(err));
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (tasks === null) return <p>Loading tasks...</p>;

  const getSubmit = function (event) {
    event.preventDefault();
    const taskData = {
      title: title,
      description: description,
      priority: priority,
    };

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => console.log("tasks created:", data))
      .catch((error) => console.error("Error creating tasks:", error));
  };

  return (
    <>
      <div>
        <h1 className="text-4x1 underline">Tasks</h1>
        <div>
          <h2>Add new task</h2>
          <form action="" method="post" onSubmit={getSubmit}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Title of the tasks"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
            <select
              name=""
              id=""
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h2>All Tasks</h2>
          {tasks.length === 0 ? (
            <p>No Tasks currently available</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task._id}>{task.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Task;
