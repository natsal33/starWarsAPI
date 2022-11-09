import { useEffect, useState } from "react";

function CharacterTable(props) {
  const characterObject = props.charactersProp.results;
  const characterNumber = props.charactersProp.count;

  console.log("in Character Table");
  console.log(characterObject);
}

export default CharacterTable;
