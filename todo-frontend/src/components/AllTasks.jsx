import { useEffect, useState } from "react";
import TaskList from "./TaskLists";

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(function () {
    const fetchData = function () {
      fetch("http://localhost:5000/tasks")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setTasks(data.data);
          setLoading(true);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const toggleDescription = (taskId) => {
    setOpenTaskId(openTaskId === taskId ? null : taskId);
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Tasks</h2>
        {tasks.length > 0 ? (
          <div>
            <TaskList
              tasks={tasks}
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

export default AllTasks;
