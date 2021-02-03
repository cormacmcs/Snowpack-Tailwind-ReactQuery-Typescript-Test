import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePokemonList } from '@app/queries/usePokemon';
import { ActionButton, AltButton } from '@app/elements/buttons';
import { usePage } from '@app/contexts/pageContext';
import PokemonView from '@app/components/pokemonView/pokemonView';

interface IProps {}

export default function DashboardBPage(props: IProps) {
  const history = useHistory();

  const [{ pageB: page }, dispatch] = usePage();

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
        <AltButton id='btn' onClick={() => history.push('/')}>
          Go to view A
        </AltButton>
      </div>
      <h5 className='my-8 text-red-500 font-bold'>Pokemon Dashboard B</h5>
      <div className='grid md:grid-cols-10 sm:grid-cols-5 items-center'>
        {pokemonList.map((pokemon) => (
          <PokemonView key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
