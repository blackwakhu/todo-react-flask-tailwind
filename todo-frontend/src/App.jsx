import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Task from "./Task";

function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <aside className="bg-gray-200 w-64 p-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700">Menu</h3>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md"
                >
                  Add Task
                </a>
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
          <div>
            <Task />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
