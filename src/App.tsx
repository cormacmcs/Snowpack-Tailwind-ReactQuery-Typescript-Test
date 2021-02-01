import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import RootNavigator from '@app/navigation/rootNavigator';
import appRoutes from '@app/navigation/appRoutes';
import { PageProvider, usePageDispatch, usePageState } from '@app/contexts/pageContext';
import { Header } from '@app/elements/header';

// Useful way to use tailwind below
// import { classnames } from 'tailwindcss-classnames';
// const bg = classnames('bg-ch-pink'as any);
// <p className={classnames(bg, 'text-black', 'p-4', 'rounded', 'mb-4')}></p>

const ShinyButton = () => {
  const dispatch = usePageDispatch();
  const { shiny } = usePageState();

  return (
    <span
      className={`cursor-pointer ${shiny ? 'text-yellow-300' : 'text-white'}`}
      onClick={() => dispatch({ type: 'toggleShiny' })}
    >
      Shiny
    </span>
  );
};
interface AppProps {}

function App({}: AppProps) {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PageProvider>
          <div className='flex flex-col justify-start'>
            <Header>
              <h4>Pokemon</h4> <ShinyButton />
            </Header>
            <RootNavigator appRoutes={appRoutes} />
          </div>
        </PageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
