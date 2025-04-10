import { useEffect, useState } from "react";

export default function Search() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = () =>
      fetch("http://localhost:5000/tasks")
        .then((res) => res.json())
        .then((data) => {
          setTasks(data.data);
          setFilteredTasks(data.data);
        })
        .catch((err) => console.error(`error fetching tasks ${err}`));
    fetchTasks();
  }, []);

  useEffect(() => {
    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchQuery, tasks]);

  return (
    <>
      <div>
        <h1>Search Tasks</h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <p>Schedule: {task.schedule}</p>
            <p>Created: {task.created}</p>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
