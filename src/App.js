import "./App.scss";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        setPokemon({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
          type: res.data.types[0].type.name,
        });
        setPokemonChosen(true);
      });
  };
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokédex</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          value={pokemonName.toLowerCase()}
          placeholder="Search your Pokémon..."
        />
        <div>
          {pokemonName && <button onClick={searchPokemon}>Search</button>}
        </div>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <img
            className="pokeball"
            src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif"
            alt=""
          ></img>
        ) : (
          <>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>
              <span>Number:</span> #{pokemon.number}
            </h3>
            <h3>
              <span>Species:</span> {pokemon.species}
            </h3>
            <h3>
              <span>Type:</span> {pokemon.type}
            </h3>
            <h4>
              <span>Hp:</span> {pokemon.hp}
            </h4>
            <h4>
              <span>Attack:</span> {pokemon.attack}
            </h4>
            <h4>
              <span>Defense:</span> {pokemon.defense}
            </h4>
            <h4>
              <span>Speed:</span> {pokemon.speed}
            </h4>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
