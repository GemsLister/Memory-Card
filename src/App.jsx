import { useState } from "react";
import memodexLogo from "./assets/memodexLogo.png";
import { CardsSection } from "./components/CardsSection.jsx";
import { useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [pokeDetails, setPokeDetails] = useState([]);
  const increaseScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

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
        <img src={memodexLogo} alt="game-logo" className="game-logo sm:w-15 md:w-18 lg:w-22" />
        {/* score section */}
        <section className="score-section font-bitcount text-[1.5rem] text-white">
          <h1>Score: {score}</h1>
          <h1>High Score: 0</h1>
        </section>
      </header>
      <main className="flex justify-center">
        <CardsSection pokeDetails={pokeDetails} />
      </main>
    </>
  );
}

export default App;
