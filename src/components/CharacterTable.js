import { useEffect, useState } from "react";
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CharacterItem from "./CharacterItem";

function CharacterTable(props) {
  const characterObject = props.charactersProp;
  var newCharacterArray = [];

  if (characterObject) {
    newCharacterArray = characterObject.map((character) => {
      return (
        <CharacterItem
          key={character.url}
          characterProp={character}
        ></CharacterItem>
      );
    });
  }

  return (
    <div className="d-flex justify-content-center">
      <Row>
        <Col sm="12" md="12" lg="12">
          <h4 className="d-flex justify-content-center p-2">
            Star Wars Character Database{" "}
          </h4>
        </Col>
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
          <tbody>{newCharacterArray}</tbody>
        </Table>
      </Row>
    </div>
  );
}

export default CharacterTable;
