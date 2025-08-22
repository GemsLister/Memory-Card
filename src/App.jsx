import { useState, useEffect } from "react";
import memodexLogo from "./assets/memodexLogo.png";
import { ScoreSection } from "./components/ScoreSection.jsx";
import { CardsSection } from "./components/CardsSection.jsx";

function App() {
  const [pokemonClicked, setPokemonClicked] = useState([]);
  const [pokeDetails, setPokeDetails] = useState([]);

  const getInitialScore = () => {
    const savedScore = localStorage.getItem("scoreKey");
    try {
      return savedScore ? JSON.parse(savedScore) : 0;
    } catch (e) {
      console.error("Invalid score in localStorage:", savedScore);
      return 0;
    }
  };

  const [score, setScore] = useState(getInitialScore);

  useEffect(() => {
    localStorage.setItem("scoreKey", score);
  }, [score]);

  useEffect(() => {
    let pokeIndexArray = [];
    // Insert 12 numbers inside the pokeIndexArray
    for (let i = 0; i < 12; i++) pokeIndexArray.push(i);

    async function FetchData() {
      let pokeArray = [];
      let current = pokeIndexArray.length;
      let random;

      // Fisher-Yates shuffle algorithm to shuffle the array
      while (current !== 0) {
        random = Math.floor(Math.random() * current);
        current--;
        [pokeIndexArray[current], pokeIndexArray[random]] = [
          pokeIndexArray[random],
          pokeIndexArray[current],
        ];

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeIndexArray[current] + 1}`,
          { mode: "cors" }
        );

        let pokeData = await response.json();
        // Push the pokemon data into the pokeArray
        pokeArray.push({
          name: pokeData.name.toUpperCase(),
          // to store random pokemon sprites
          sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokeIndexArray[current] + 1
          }.png`,
          id: pokeData.id,
        });
      }
      setPokeDetails(pokeArray);
      console.log(pokeArray);
    }
    FetchData();
    return () => {
      console.log("Clean");
    };
  }, []);

  return (
    <>
      <header className="flex items-center justify-around bg-poke-blue shadow-header">
        <img
          src={memodexLogo}
          alt="game-logo"
          className="game-logo sm:w-15 md:w-18 lg:w-22"
        />
        {/* Score section */}
        <ScoreSection
          setPokemonClicked={setPokemonClicked}
          pokemonClicked={pokemonClicked}
          score={score}
          setScore={setScore}
          pokeDetails={pokeDetails}
        />
      </header>
      <main className="flex justify-center">
        {/* Cards section */}
        <CardsSection
          pokeDetails={pokeDetails}
          setPokemonClicked={setPokemonClicked}
          setPokeDetails={setPokeDetails}
          setScore={setScore}
        />
      </main>
    </>
  );
}

export default App;
