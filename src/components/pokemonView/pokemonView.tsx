import React from 'react';
import { usePokemonDetails } from '@app/queries/usePokemon';
import { ProvideContext } from '@app/react-provide-context';
import { StyleProvider } from '@app/contexts/styleContext';

const PokemonView = ({ pokemon, shiny }: { pokemon: any; shiny?: boolean }) => {
  const { pokemonDetails, status, error } = usePokemonDetails(pokemon);

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  return (
    <div className='flex flex-col items-center dark:text-white'>
      <div>{pokemon.name}</div>
      {status === 'loading' && <div>...</div>}
      {status === 'success' && (
        <div className='h-16 w-16 flex justify-center items-center mx-4'>
          <img src={shiny ? pokemonDetails?.sprites?.front_shiny : pokemonDetails?.sprites?.front_default} />
        </div>
      )}
    </div>
  );
};

export default React.memo(ProvideContext([StyleProvider])(PokemonView));
