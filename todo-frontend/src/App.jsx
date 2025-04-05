import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { response } from "express";

function App() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [item, setItem] = useState("");
  const [inp, setInp] = useState("");

  function submit_btn(event){
    event.preventDefault()
    let url = `http://localhost:5000/${inp}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
        setItem(data.item)
      })
      .catch((error) => console.error("error in fetching data:",error))
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
      <h1 className="text-5xl">Hello world</h1>
      <form onSubmit={submit_btn}>
        <input
          type="text"
          name=""
          id=""
          value={inp}
          onChange={(e) => {
            setInp(e.target.value);
          }}
        />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={hello_function}>click me</button>
      <p>
        {message} {count}
      </p>
      <p>{item}</p>
    </>
  );
}

export default App;
