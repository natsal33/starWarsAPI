import { useEffect, useState } from "react";
import React, { Component } from "react";
import axios from "axios";

function CharacterItem(props) {
  const [homeworld, setHomeworld] = useState("");
  const [species, setSpecies] = useState("");

  useEffect(() => {
    axios
      .get(props.characterProp.homeworld)
      .then((response) => {
        if (response.data.name) {
          setHomeworld(response.data.name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    axios
      .get(props.characterProp.species)
      .then((response) => {
        if (response.data.name) {
          setSpecies(response.data.name);
        } else {
          setSpecies("Human");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <tr>
      <td>{props.characterProp.name}</td>
      <td>{props.characterProp.birth_year}</td>
      <td>{props.characterProp.height}</td>
      <td>{props.characterProp.mass}</td>
      <td>{homeworld}</td>
      <td>{species}</td>
    </tr>
  );
}

export default CharacterItem;
