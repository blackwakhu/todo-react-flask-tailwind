import { useEffect, useState } from "react";

function Task() {
  const [tasks, setTasks] = useState([]);
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

  if (tasks.length === 0) return <p>No tasks found.</p>;
  return (
    <>
      <div>
        <h1>tasks</h1>
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
    </>
  );
}

export default Task;
