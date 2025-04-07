import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Task from "./Task";

function App() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [item, setItem] = useState("");
  const [inp, setInp] = useState("");

  function submit_btn(event){
    event.preventDefault();

    // Assuming inp is a variable storing the input value
    if (!inp) {
      console.error("Input is empty.");
      return;
    }
  
    const url = `http://localhost:5000/${encodeURIComponent(inp)}`;
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
        setItem(data.item);
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      });
  }

  function hello_function() {
    setCount(count + 1);
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setItem("");
      })
      .catch((error) => console.error("error in fetching data: ", error));
  }

  return (
    <>
      <div>
        
      </div>
      <div>
        <Task/>
      </div>
    </>
  );
}

export default App;
