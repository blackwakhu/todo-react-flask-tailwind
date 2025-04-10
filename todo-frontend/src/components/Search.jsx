import { useEffect, useState } from "react";
import TaskList from "./TaskLists";

export default function Search() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

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

  const toggleDescription = (taskId) => {
    setOpenTaskId(openTaskId === taskId ? null : taskId);
  };

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
        {filteredTasks.length > 0 ? (
          <div>
            <TaskList
              tasks={filteredTasks}
              openTaskId={openTaskId}
              hoveredTaskId={hoveredTaskId}
              toggleDescription={toggleDescription}
              setHoveredTaskId={setHoveredTaskId}
            />
          </div>
        ) : (
          <div>No tasks available</div>
        )}
      </div>
    </>
  );
}
