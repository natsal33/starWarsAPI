import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ReactLoading from "react-loading";
import Table from "react-bootstrap/Table";

function App() {
  const PEOPLE_URL = "https://swapi.dev/api/people/";
  const [characterData, setCharacterData] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setURL] = useState(PEOPLE_URL);
  const [characterArray, setCharacterArray] = useState([]);
  const [homeworld, setHomeworld] = useState("");

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(url, { params: { page: pageNumber } })
        .then((response) => {
          const characterObject = response.data.results;
          var newCharacterArray = characterObject.map((character) => {
            setHomeworld("x");
            console.log(homeworld);
            await getCharacterProperty(character.homeworld);
            return (
              <tr key={character.name}>
                <td>{character.name}</td>
                <td>{character.birth_year}</td>
                <td>{character.height}</td>
                <td>{character.mass}</td>
                <td>{homeworld}</td>
                {/* <td>{getCharacterProperty(character.species)}</td> */}
              </tr>
            );
          });
          setCharacterArray(newCharacterArray);
          setNumberOfPages(response.data.count / 10);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [url, pageNumber]);

  const changePage = (pageNumber) => {
    console.log("Page Number " + pageNumber);
    setPageNumber(pageNumber);
  };

  const getCharacterProperty = async (propertyURL) => {
    if (propertyURL) {
      await axios
        .get(propertyURL)
        .then((response) => {
          if (response.data.name) {
            setHomeworld(response.data.name);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
          variant="dark"
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
        <Badge bg="dark">Star Wars Character API </Badge>
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
            <Table striped className="justify-content-center p-2">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Birthdate</th>
                  <th>Height</th>
                  <th>Mass</th>
                  <th>Homeworld</th>
                  <th>Species</th>
                </tr>
              </thead>
              <tbody>{characterArray}</tbody>
            </Table>
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
