import { useState, useEffect } from "react";
export const ScoreSection = ({ pokemonClicked }) => {
  const [score, setScore] = useState();
  useEffect(() => {
    let handleScoreChange = () => {
      setScore([0]);
      pokemonClicked.filter((item, index) => {
        if (pokemonClicked.indexOf(item) !== index) {
          console.log("Game Over");
          pokemonClicked.length = 0;
        } else {
          console.log(`Selected Pokémon ID: ${item} ${index}`);
        }
        console.log(
          `Current Pokémon Array: ${pokemonClicked}, ${pokemonClicked.length}`
        );
      });
    };
    handleScoreChange();
    setScore([pokemonClicked.length]);
    if (pokemonClicked.length === 12) {
      console.log("You win!");
      pokemonClicked.length = 0;
    }
  }, [pokemonClicked]);

  return (
    <section className="score-section font-bitcount text-[1.5rem] text-white">
      <h1>Score: {score}</h1>
      <h1>High Score: 0</h1>
    </section>
  );
};
