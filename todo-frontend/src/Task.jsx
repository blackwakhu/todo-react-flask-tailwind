import { useEffect, useState } from "react";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  return (
    <>
      <div>
        <h1 className="text-4x1 underline">Tasks</h1>
        <div>
          <h2>Add new task</h2>
          <form action="" method="post">
            <input
              type="text"
              name=""
              id=""
              placeholder="Title of the tasks"
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>
          <h2>All Tasks</h2>
          {tasks.length === 0 ? (
            <p>No Tasks currently available</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task._id}>{task._id}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Task;
