import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ReactLoading from "react-loading";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function App() {
  const PEOPLE_URL = "https://swapi.dev/api/people/";
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [url, setURL] = useState(PEOPLE_URL);
  const [characterArray, setCharacterArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { params: { page: pageNumber } });
        setNumberOfPages(Math.ceil(response.data.count / 10));
        const characters = response.data.results;
        for (const character of characters) {
          const homeworldResponse = await axios.get(character.homeworld);
          character.homeworldName = homeworldResponse.data.name;
          if (character.species.length !== 0) {
            const speciesResponse = await axios.get(character.species[0]);
            character.speciesName = speciesResponse.data.name;
          } else {
            character.speciesName = "Human";
          }
          setCharacterArray(characters);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, pageNumber]);

  const changePage = (pageNumber) => {
    console.log("Page Number " + pageNumber);
    setPageNumber(pageNumber);
  };

  const conductSearch = (e) => {
    const newURL = PEOPLE_URL + "?search=" + userInput;
    setURL(newURL);
    e.preventDefault();
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

  const tableRows = characterArray.map((character) => {
    return (
      <tr key={character.name}>
        <td>{character.name}</td>
        <td>{character.birth_year}</td>
        <td>{character.height}</td>
        <td>{character.mass}</td>
        <td>{character.homeworldName}</td>
        <td>{character.speciesName}</td>
      </tr>
    );
  });

  return (
    <div id="page">
      <h1 className="d-flex p-2 justify-content-center">
        <Badge bg="dark">Star Wars Character API </Badge>
      </h1>
      <div className="p-2">
        <Form onSubmit={conductSearch}>
          <Form.Group className="d-flex justify-content-center">
            <Form.Control
              placeholder="R2-D2"
              onChange={(e) => setUserInput(e.target.value)}
              className="w-25"
            ></Form.Control>
            <Button type="submit" variant="dark">
              Search
            </Button>
          </Form.Group>
        </Form>

        {isLoading === false ? (
          <div>
            <Row className="p-2">
              <Table id="table" striped className="justify-content-center p-2">
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
                <tbody>{tableRows}</tbody>
              </Table>
            </Row>
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
        ) : (
          <div className="d-flex m-5 justify-content-center">
            <ReactLoading type="spin" color="#C96d29" height={100} width={50} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
