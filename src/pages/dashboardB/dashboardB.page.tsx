import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePokemonList } from '@app/queries/usePokemon';
import { ActionButton, AltButton } from '@app/elements/buttons';
import { usePage } from '@app/contexts/pageContext';
import PokemonView from '@app/components/pokemonView/pokemonView';

interface IProps {}

export default function DashboardBPage(props: IProps) {
  const history = useHistory();

  const [{ pageB: page }, { setB: setPage }] = usePage();

  const { pokemonList, isLoading, isError, isFetching, error } = usePokemonList(parseInt(page));

  if (isLoading) {
    return <div className='dark:text-white'>Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='flex flex-col items-center h-full dark:bg-gray-800'>
      <div className='flex flex-row justify-between mt-8'>
        <ActionButton
          id='btn'
          onClick={() => setPage(JSON.stringify(Math.max(parseInt(page) - 1, 0)))}
          disabled={parseInt(page) === 0}
        >
          Previous Page
        </ActionButton>
        <ActionButton id='btn' onClick={() => setPage(JSON.stringify(parseInt(page) + 1))}>
          Next Page
        </ActionButton>
        <AltButton id='btn' onClick={() => history.push('/')}>
          Go to view A
        </AltButton>
      </div>
      <h5 className='my-8 text-red-500 font-bold'>Pokemon Dashboard B</h5>
      <div className='grid md:grid-cols-10 sm:grid-cols-5 items-center'>
        {!isFetching && pokemonList.map((pokemon) => <PokemonView key={pokemon.name} pokemon={pokemon} />)}
      </div>
    </div>
  );
}
