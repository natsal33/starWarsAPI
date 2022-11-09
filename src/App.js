import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [dataOutput, changeOutput] = useState("");
  console.log("render1");

  useEffect(() => {
    console.log("render");
    axios
      .get("https://swapi.dev/api/people/1")
      .then((response) => {
        console.log(response.data);
        changeOutput(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const output = dataOutput;

  return (
    <div className="App">
      <p>{JSON.stringify(dataOutput)}</p>
    </div>
  );
}

export default App;
