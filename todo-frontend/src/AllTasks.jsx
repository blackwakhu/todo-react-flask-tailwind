import { useEffect, useState } from "react";

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

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-300 hover:bg-red-400';
      case 'Medium':
        return 'bg-yellow-300 hover:bg-yellow-400';
      case 'Low':
        return 'bg-green-300 hover:bg-green-400';
      default:
        return 'bg-gray-200 hover:bg-gray-300'; // fallback for undefined priorities
    }
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Tasks</h2>
        {tasks.length > 0 ? (
        <div>
          {tasks.map((task) => {
            const isOpen = openTaskId === task._id;
            const isHovered = hoveredTaskId === task._id;

            const showDescription = isOpen || isHovered;

            const priorityClass = getPriorityClass(task.priority)

            return (
              <div
                key={task._id}
                className={`rounded m-1 px-3 py-2 transition-transform duration-200 transform cursor-pointer ${priorityClass} ${
                  isHovered && !isOpen ? "hover:scale-105" : ""
                }`}
                onClick={() => toggleDescription(task._id)}
                onMouseEnter={() => setHoveredTaskId(task._id)}
                onMouseLeave={() => setHoveredTaskId(null)}
              >
                <span
                  className={`hover:underline ${
                    isHovered && !isOpen ? "underline" : ""
                  }`}
                >
                  {task.title}
                </span>
                {showDescription && (
                  <p className="ml-2 text-gray-700">{task.description}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>No tasks available</div>
      )}
      </div>
    </>
  );
}

export default AllTasks;
