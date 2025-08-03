export const CardsSection = ({ pokeDetails }) => {
  return (
    <section className="card-section sm:grid sm:grid-rows-3 sm:grid-cols-4 gap-3 place-items-center">
      {pokeDetails &&
        pokeDetails.map((img, idx) => {
          return (
            <figure
              key={idx}
              className="flex flex-col items-center justify-center bg-amber-400 rounded-[8px] md:w-[100%]"
            >
              <img
                src={img.sprites}
                alt={`sprite-${idx}`}
                className="sm:w-40"
              />
              <p>{img.name}</p>
            </figure>
          );
        })}
    </section>
  );
};
