import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePokemonList } from '@app/queries/usePokemon';
import { ActionButton, AltButton } from '@app/elements/buttons';
import { usePage } from '@app/contexts/pageContext';
import PokemonView from '@app/components/pokemonView/pokemonView';

interface IProps {}

export default function DashboardPage(props: IProps) {
  const history = useHistory();

  const [{ pageA: page, shiny }, dispatch] = usePage();

  const { pokemonList, status, error } = usePokemonList(page);

  if (status === 'loading') {
    return <div>Loading</div>;
  }
  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  const setPage = (page) => {
    dispatch({ type: 'setA', value: page });
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
        <AltButton id='btn' onClick={() => history.push('/b')}>
          Go to view B
        </AltButton>
      </div>

      <h5 className='my-8 text-blue-500 font-bold'>Pokemon Dashboard A</h5>
      <div className='grid grid-cols-5 items-center'>
        {pokemonList.map((pokemon) => (
          <PokemonView key={pokemon.name} pokemon={pokemon} shiny={shiny} />
        ))}
      </div>
    </div>
  );
}
