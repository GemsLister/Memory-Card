import { useState } from "react";
import memodexLogo from "./assets/memodexLogo.png";
import { CardsSection } from "./components/CardsSection.jsx";
import { useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [pokeDetails, setPokeDetails] = useState(null);
  const increaseScore = () => {
    setScore((prevScore) => prevScore + 1);
  };
  let pokemons = [];

  async function fetchData() {
    const randomNumber = Math.floor(Math.random() * 300);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
      { mode: "cors" }
    );
    let pokeData = await response.json();
    console.log(pokeData);
    console.log(pokeData.sprites.front_default);

    for (let i = 0; i < 12; i++) {
      pokeData.id = randomNumber;
      pokemons.push({
        name: pokeData.name,
        sprites: pokeData.sprites.front_default,
        id: pokeData.id, 
      });
    }
    setPokeDetails(pokemons);
  }

  useEffect(() => {
    fetchData();
    return () => {
      console.log("clean");
    };
  }, []);

  return (
    <>
      <header className="flex items-center justify-around bg-poke-blue shadow-header">
        <img src={memodexLogo} alt="game-logo" className="game-logo sm:w-24" />
        {/* score section */}
        <section className="score-section font-bitcount text-score-base text-white">
          <h1>Score: {score}</h1>
          <h1>High Score: 0</h1>
        </section>
      </header>
      <main className="bg-semi-white">
        <CardsSection pokeDetails={pokeDetails} />
      </main>
    </>
  );
}

export default App;
