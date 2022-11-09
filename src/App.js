import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import CharacterTable from "./components/CharacterTable";
import Button from "react-bootstrap/Button";

function App() {
  const [characterData, retrieveCharacterData] = useState("");
  const [userInput, updateInput] = useState("");
  const [pageNumber, flipPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/", {
        params: {
          page: pageNumber,
        },
      })
      .then((response) => {
        // console.log(response.data);
        retrieveCharacterData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    updateInput(e.target.value);
    // console.log(userInput);
  };

  const conductSearch = () => {};

  return (
    <div>
      <div>
        <Form onSubmit={conductSearch()}>
          <Form.Control
            placeholder="Luke Skywalker"
            onChange={(e) => handleChange(e)}
          ></Form.Control>
          <Button type="submit">Search</Button>
          <CharacterTable charactersProp={characterData}></CharacterTable>
        </Form>
      </div>
      <p>{JSON.stringify(characterData)}</p>
    </div>
  );
}

export default App;
