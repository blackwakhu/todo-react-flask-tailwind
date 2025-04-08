import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Task from "./Task";
import AllTasks from "./AllTasks";

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const handleItemClick = function (name) {
    setActiveItem(name);
  };
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <aside className="bg-gray-200 w-64 p-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 transition-transform duration-200 transform hover:scale-105">
              Menu
            </h3>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleItemClick("dashboard")}
                  className={`block py-2 px-4 transition-transform duration-200 transform hover:scale-105 text-gray-700 hover:bg-gray-300 rounded-md w-full text-left ${
                    activeItem === "dashboard" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("add task")}
                  className={`block transition-transform duration-200 transform hover:scale-105 py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md w-full text-left ${
                    activeItem === "add task" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  Add Task
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("all tasks")}
                  className={`block py-2 px-4 transition-transform duration-200 transform hover:scale-105 text-gray-700 hover:bg-gray-300 rounded-md w-full text-left ${
                    activeItem === "all tasks" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  All Tasks
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md"
                >
                  Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md"
                >
                  Today
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md"
                >
                  Upcoming
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="flex-1 p-6">
          <div className="bg-white rounded-md shadow-md p-6">
            {activeItem === "dashboard" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Dashboard
                </h2>
              </div>
            )}
            {activeItem === "add task" && (
              <Task setActiveItem={setActiveItem} />
            )}
            {activeItem === "all tasks" && <AllTasks />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
