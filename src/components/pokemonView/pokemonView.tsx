import React from 'react';
import { usePokemonDetails } from '@app/queries/usePokemon';

const PokemonView = ({ pokemon, shiny }: { pokemon: any; shiny?: boolean }) => {
  const { pokemonDetails, status, error } = usePokemonDetails(pokemon);

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  return (
    <div className='flex flex-col items-center'>
      <div>{pokemon.name}</div>
      {status === 'loading' && <div>...</div>}
      {status === 'success' && (
        <img
          width={60}
          height={60}
          src={shiny ? pokemonDetails?.sprites?.front_shiny : pokemonDetails?.sprites?.front_default}
        />
      )}
    </div>
  );
};

export default PokemonView;
