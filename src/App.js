import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import CharacterTable from "./components/CharacterTable";
import Button from "react-bootstrap/Button";
import { ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    <div id="page">
      <h1 className="d-flex p-2 justify-content-center">
        Star Wars Character API{" "}
      </h1>

      <div className="p-2">
        <Form onSubmit={conductSearch()}>
          <Form.Group className="d-flex justify-content-center">
            <Form.Label className="p-2">Search</Form.Label>
            <Form.Control
              placeholder="R2-D2"
              onChange={(e) => conductSearch(e)}
              className="w-25"
            ></Form.Control>
          </Form.Group>
          <Row className="p-2">
            <CharacterTable
              id="table"
              charactersProp={characterData}
            ></CharacterTable>
          </Row>
        </Form>
        <Row>
          <Col md="2"></Col>
          <Col md="8" className="d-flex justify-content-center">
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
          </Col>
          <Col md="2"></Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
