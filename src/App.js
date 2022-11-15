import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import CharacterTable from "./components/CharacterTable";
import Button from "react-bootstrap/Button";
import { ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";

function App() {
  const PEOPLE_URL = "https://swapi.dev/api/people/";
  const [characterData, setCharacterData] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setURL] = useState(PEOPLE_URL);

  useEffect(() => {
    axios
      .get(url, { params: { page: pageNumber } })
      .then((response) => {
        setCharacterData(response.data.results);
        setNumberOfPages(response.data.count / 10);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url, pageNumber]);

  const changePage = (pageNumber) => {
    console.log("Page Number " + pageNumber);
    setPageNumber(pageNumber);
  };

  const conductSearch = (e) => {
    if (e) {
      const newURL = PEOPLE_URL + "?search=" + e.target.value;
      setURL(newURL);
    }
  };

  const createPageArray = () => {
    var newPageArray = [];
    for (var i = 1; i <= numberOfPages; i++) {
      newPageArray.push(
        <ToggleButton
          key={i}
          id={i}
          type="radio"
          value={i}
          checked={pageNumber === i}
        >
          {i}
        </ToggleButton>
      );
    }
    return newPageArray;
  };

  return (
    <div>
      <div>
        <Form onSubmit={conductSearch()}>
          <Form.Control
            placeholder="Luke Skywalker"
            onChange={(e) => conductSearch(e)}
          ></Form.Control>
          <CharacterTable charactersProp={characterData}></CharacterTable>
        </Form>
        <ToggleButtonGroup
          type="radio"
          name="pages"
          value={pageNumber}
          onChange={(e) => {
            changePage(e);
          }}
        >
          {createPageArray()}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

export default App;
