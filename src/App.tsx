import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import RouteNavigator from '@app/navigation/routeNavigator';
import appRoutes from '@app/navigation/appRoutes';
import { PageProvider } from '@app/contexts/pageContextB';
import { StyleProvider, useStyle, useStyleState } from '@app/contexts/styleContextB';
// import CombineProviders from '@app/contexts/CombineProviders';
import { MultiProvider } from '@app/react-provide-context';
import { Header } from '@app/elements/header';

const queryClient = new QueryClient();

const ShinyToggle = () => {
  const [{ shiny }, dispatch] = useStyle();

  return (
    <span
      className={`cursor-pointer mx-2 ${shiny ? 'text-yellow-300' : 'text-white'}`}
      onClick={() => dispatch({ type: 'toggleShiny' })}
    >
      Shiny
    </span>
  );
};

const DarkToggle = () => {
  const [{ dark }, dispatch] = useStyle();

  return (
    <span
      className={`cursor-pointer mx-2 ${dark ? 'text-gray-700' : 'text-white'}`}
      onClick={() => dispatch({ type: 'toggleDark' })}
    >
      Dark
    </span>
  );
};

// const ToggleWithContext = ProvideContext(StyleProvider)(ShinyToggle);

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { dark } = useStyleState();
  return (
    <div className={`flex flex-col justify-start w-screen max-w-none h-screen flex-grow ${dark ? 'dark' : ''}`}>
      {children}
    </div>
  );
};

interface AppProps {}

function App({}: AppProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MultiProvider providers={[PageProvider, StyleProvider]}>
          {/* <PageProvider>
          <StyleProvider> */}
          <AppWrapper>
            <Header>
              <h4>Pokemon</h4>
              <div>
                <ShinyToggle /> <DarkToggle />
              </div>
            </Header>
            <RouteNavigator appRoutes={appRoutes} />
          </AppWrapper>
          {/* </StyleProvider>
        </PageProvider> */}
        </MultiProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
