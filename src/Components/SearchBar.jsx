import React from "react";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

function SearchBar({
  setURL,
  userInput,
  setNoResults,
  setUserInput,
  PEOPLE_URL,
}) {
  const conductSearch = (e) => {
    setNoResults(false);
    const newURL = PEOPLE_URL + "?search=" + userInput;
    setURL(newURL);
    e.preventDefault();
  };

  return (
    <div>
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
      </div>
    </div>
  );
}

export default SearchBar;
