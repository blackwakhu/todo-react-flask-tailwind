import React, { useEffect, useState } from "react";

function Task({ setActiveItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [schedule, setSchedule] = useState(null);

  const getSubmit = function (event) {
    event.preventDefault();
    const taskData = {
      title: title,
      description: description,
      priority: priority,
      schedule: schedule,
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
      .then((data) => {
        console.log("tasks created:", data);
      })
      .catch((error) => console.error("Error creating tasks:", error));
    setActiveItem("all tasks");
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Task</h2>
        <div>
          <form action="" method="post" onSubmit={getSubmit}>
            <label
              htmlFor="title"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title of the tasks"
              className="shadow appearance-none border rounded min-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="description"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="shadow appearance-none border min-w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
            <label
              htmlFor="priority"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              className="shadow appearance-none min-w-full border rounded py-2 px-3 text-gray-700"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <label
              htmlFor="date_schedule"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Date Scheduled
            </label>
            <input
              className="shadow appearance-none border rounded min-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="datetime-local"
              name="schedule"
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Task;
