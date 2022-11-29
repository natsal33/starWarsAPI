import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import DisplayTable from "./Components/DisplayTable";

function App() {
  const PEOPLE_URL = "https://swapi.dev/api/people/";
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [url, setURL] = useState(PEOPLE_URL);
  const [characterArray, setCharacterArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    getData();
  }, [url, pageNumber]);

  async function getData() {
    setIsLoading(true);
    try {
      const response = await axios.get(url, { params: { page: pageNumber } });

      if (response.data.count > 0) {
        setNumberOfPages(Math.ceil(response.data.count / 10));
        const characters = response.data.results;

        for (const character of characters) {
          character.homeworld = await getHomeworldName(character.homeworld);
          character.species = await getSpeciesName(character.species);
          setCharacterArray(characters);
        }
      } else {
        setNoResults(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getHomeworldName(homeworldURL) {
    return (await axios.get(homeworldURL)).data.name;
  }

  async function getSpeciesName(speciesArray) {
    return speciesArray.length === 0
      ? "Human"
      : (await axios.get(speciesArray[0])).data.name;
  }

  return (
    <div>
      <SearchBar
        setURL={setURL}
        userInput={userInput}
        setNoResults={setNoResults}
        setUserInput={setUserInput}
        PEOPLE_URL={PEOPLE_URL}
      />
      <DisplayTable
        numberOfPages={numberOfPages}
        isLoading={isLoading}
        noResults={noResults}
        characterArray={characterArray}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}

export default App;
