import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePokemonList } from '@app/queries/usePokemon';
import { ActionButton, AltButton } from '@app/elements/buttons';
import { usePage } from '@app/contexts/pageContext';
import { useStyleState } from '@app/contexts/styleContext';
import PokemonView from '@app/components/pokemonView/pokemonView';

interface IProps {}

export default function DashboardPage(props: IProps) {
  const history = useHistory();
  const { shiny } = useStyleState();
  const [{ pageA: page }, { setA: setPage }] = usePage();

  const { pokemonList, isLoading, isError, isFetching, error } = usePokemonList(page);

  if (isLoading) {
    return <div className='dark:text-white'>Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='flex flex-col items-center h-full dark:bg-gray-800'>
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
        {!isFetching &&
          pokemonList.map((pokemon) => <PokemonView key={pokemon.name} pokemon={pokemon} shiny={shiny} />)}
      </div>
    </div>
  );
}

// const createProvidersStack = (providers: Provider[], children, props, index: number = 0) => {
//   const isFinalNode = index === providers.length - 1;
//   const component = providers[index];
//   if (!isFinalNode) {
//     return React.createElement(component, createProvidersStack(providers, children, props, ++index));
//   } else {
//     return React.createElement(component, {
//       ...(props || {}),
//       children,
//     });
//   }
// };

// export const MultiProvider: React.FC<MultiProviderProps> = ({ providers, children }) => {
//   return createProvidersStack(providers, children, {});
// };

// export const ProvideContext = (ProvideContext: Provider | Provider) => (Component: React.ReactNode) => (props) => {
//   const providers = ProvideContext instanceof Array ? ProvideContext : [ProvideContext];
//   return createProvidersStack(providers, Component, props);
// };
