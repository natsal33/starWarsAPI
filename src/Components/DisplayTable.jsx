import React from "react";
import { ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactLoading from "react-loading";
import Table from "react-bootstrap/Table";
import "./DisplayTable.css";

function DisplayTable({
  isLoading,
  noResults,
  pageNumber,
  setPageNumber,
  characterArray,
  numberOfPages,
}) {
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
        <td>{character.homeworld}</td>
        <td>{character.species}</td>
      </tr>
    );
  });

  const changePage = (pageNumber) => {
    console.log("Page Number " + pageNumber);
    setPageNumber(pageNumber);
  };

  return (
    <div id="tableLayout">
      {isLoading === false ? (
        <div>
          <Row className="p-2">
            <Table id="table" striped className="justify-content-center p-2">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Birthdate</th>
                  <th>Height (cm)</th>
                  <th>Mass (kg)</th>
                  <th>Homeworld</th>
                  <th>Species</th>
                </tr>
              </thead>
              {noResults === false ? (
                <tbody>{tableRows}</tbody>
              ) : (
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>No Results</th>
                  <th></th>
                  <th></th>
                </tr>
              )}
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
  );
}

export default DisplayTable;
