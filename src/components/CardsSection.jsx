import { useEffect } from "react";

export const CardsSection = ({ pokeDetails, setPokemonClicked }) => {
  const clickHandler = (pokeID) => {
    console.log(`Clicked Pokémon ID: ${pokeID}`);
    // Checks if the pokemon ID is null for inserting an ID in the array
    setPokemonClicked((prevPokemon) =>
      pokeID != null ? [...prevPokemon, pokeID] : prevPokemon
    );
  };

  const restartPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    clickHandler();
  }, []);

  return (
    <section className="card-section sm:grid sm:grid-rows-4 sm:grid-cols-3 sm:gap-5 md:grid-rows-3 md:grid-cols-4 justify-items-center h-[100%] w-[100%] md:w-[95%] lg:w-[85%] sm:p-5 md:p-6">
      {pokeDetails &&
        pokeDetails.map((_sprites, index) => {
          return (
            <button
              type="button"
              key={index}
              className="flex flex-col items-center justify-center bg-poke-bluegray rounded-[8px] sm:w-[100%] h-[100%] cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-poke-bluegray/80 active:bg-poke-bluegray/60 shadow-header text-poke-text"
              onClick={() => {
                clickHandler(_sprites.id);
                restartPage();
              }}
            >
              <img
                src={_sprites.sprites}
                alt={_sprites.name}
                className="sm:w-[120px] md:w-[140px] lg:w-[180px]"
              />
              <p className="font-nunito font-[800] sm:pb-5 sm:text-[18.5px]">
                {_sprites.name}
              </p>
            </button>
          );
        })}
    </section>
  );
};
