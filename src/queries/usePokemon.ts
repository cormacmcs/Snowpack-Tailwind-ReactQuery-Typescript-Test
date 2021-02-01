import { useQuery } from 'react-query';
import api from '@common/api';

interface Pokemon {
  url: string;
  name: string;
}

export const usePokemonList = (page?: number) => {
  const result = useQuery<any, Error>(
    ['pokemon', page || 0],
    async () => api.get('https://pokeapi.co/api/v2/pokemon/' + `?limit=20&offset=${20 * page}"`),
    {
      keepPreviousData: true,
    }
  );

  return {
    ...result,
    pokemonList: result.data?.results,
  };
};

export const usePokemonDetails = (pokemon: Pokemon) => {
  const result = useQuery<any, Error>(['PokemonDetails', pokemon.name], async () => api.get(pokemon.url));

  return {
    ...result,
    pokemonDetails: result.data,
  };
};
