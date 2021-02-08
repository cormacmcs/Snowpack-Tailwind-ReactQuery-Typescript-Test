import * as React from 'react';

type PageProviderProps = { children: React.ReactNode };
type Dispatch = (action: Action) => void;

type Action = { type: 'setA'; value: number } | { type: 'setB'; value: number };
type State = { pageA: number; pageB: number };

const PageStateContext = React.createContext<State | undefined>(undefined);
const PageDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const initialState: State = { pageA: 0, pageB: 0 };

function pageReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setA': {
      return { ...state, pageA: action.value };
    }
    case 'setB': {
      return { ...state, pageB: action.value };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function PageProvider({ children }: PageProviderProps) {
  const [state, dispatch] = React.useReducer(pageReducer, initialState);
  return (
    <PageStateContext.Provider value={state}>
      <PageDispatchContext.Provider value={dispatch}>{children}</PageDispatchContext.Provider>
    </PageStateContext.Provider>
  );
}

function usePageState() {
  const context = React.useContext(PageStateContext);
  if (context === undefined) {
    throw new Error('usePageState must be used within a PageProvider');
  }
  return context;
}

function usePageDispatch() {
  const context = React.useContext(PageDispatchContext);
  if (context === undefined) {
    throw new Error('usePageDispatch must be used within a PageProvider');
  }
  return context;
}

function usePage(): [State, Dispatch] {
  return [usePageState(), usePageDispatch()];
}

export { PageProvider, usePageState, usePageDispatch, usePage };
