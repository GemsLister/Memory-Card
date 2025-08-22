import { useEffect, useState } from "react";
export const ScoreSection = ({
  setPokemonClicked,
  pokemonClicked,
  score,
  setScore
}) => {
  const [highScore, setHighScore] = useState(0);
  useEffect(() => {
    let handleScoreChange = () => {
      pokemonClicked.filter((item, index) => {
        if (pokemonClicked.indexOf(item) !== index) {
          console.log("Game Over");
          setScore(0);
          setHighScore((prevHighScore) => Math.max(prevHighScore, score));
          setPokemonClicked([]);
        } else if (pokemonClicked.length > 0) {
          setScore(score + 1);
          console.log(`Selected Pokémon ID: ${item}, Index: ${index}`);
        }
        console.log(
          `Current Pokémon Array: ${pokemonClicked}, Length: ${
            pokemonClicked.length
          }, Score: ${score + 1}`
        );
      });
    };
    handleScoreChange();
  }, [pokemonClicked]);

  return (
    <section className="score-section font-bitcount text-[1.5rem] text-white">
      <h1>Score: {score}</h1>
      <h1>High Score: {highScore}</h1>
    </section>
  );
};
