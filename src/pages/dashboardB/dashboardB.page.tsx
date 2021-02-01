import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePokemonList } from '@app/queries/usePokemon';
import { ActionButton } from '@app/elements/buttons';
import { usePageState, usePageDispatch } from '@app/contexts/pageContext';
import PokemonView from '@app/components/pokemonView/pokemonView';

interface IProps {}

export default function DashboardBPage(props: IProps) {
  const history = useHistory();

  const { pageB: page } = usePageState();
  const dispatch = usePageDispatch();

  const { pokemonList, status, error } = usePokemonList(page);

  if (status === 'loading') {
    return <div>Loading</div>;
  }
  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  const setPage = (page) => {
    dispatch({ type: 'setB', value: page });
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-row justify-between mt-8'>
        <ActionButton id='btn' onClick={() => setPage(Math.max(page - 1, 0))} disabled={page === 0}>
          Previous Page
        </ActionButton>
        <ActionButton id='btn' onClick={() => setPage(page + 1)}>
          Next Page
        </ActionButton>
        <ActionButton id='btn' onClick={() => history.push('/')}>
          Go to view A
        </ActionButton>
      </div>
      <h5 className='mt-8 text-red-500 font-bold'>Pokemon Dashboard B</h5>
      <div className='grid grid-cols-10 items-center'>
        {pokemonList.map((pokemon) => (
          <PokemonView key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
