export default function TaskList({
  tasks,
  openTaskId,
  hoveredTaskId,
  toggleDescription,
  setHoveredTaskId,
}) {
    
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-300 hover:bg-red-400";
      case "Medium":
        return "bg-yellow-300 hover:bg-yellow-400";
      case "Low":
        return "bg-green-300 hover:bg-green-400";
      default:
        return "bg-gray-200 hover:bg-gray-300"; // fallback for undefined priorities
    }
  };

  return (
    <div>
      {tasks.map((task) => {
        const isOpen = openTaskId === task._id;
        const isHovered = hoveredTaskId === task._id;
        const showDescription = isOpen || isHovered;
        const priorityClass = getPriorityClass(task.priority);

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
  );
}
