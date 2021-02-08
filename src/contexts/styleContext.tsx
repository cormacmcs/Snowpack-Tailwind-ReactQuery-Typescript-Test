import * as React from 'react';

type StyleProviderProps = { children: React.ReactNode };
type Dispatch = (action: Action) => void;

type Action = { type: 'toggleShiny' } | { type: 'toggleDark' };
type State = { shiny: boolean; dark: boolean };

const StyleStateContext = React.createContext<State | undefined>(undefined);
const StyleDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const initialState: State = { shiny: false, dark: false };

function styleReducer(state: State, action: Action) {
  switch (action.type) {
    case 'toggleShiny': {
      return { ...state, shiny: !state.shiny };
    }
    case 'toggleDark': {
      return { ...state, dark: !state.dark };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function StyleProvider({ children }: StyleProviderProps) {
  const [state, dispatch] = React.useReducer(styleReducer, initialState);
  return (
    <StyleStateContext.Provider value={state}>
      <StyleDispatchContext.Provider value={dispatch}>{children}</StyleDispatchContext.Provider>
    </StyleStateContext.Provider>
  );
}

function useStyleState() {
  const context = React.useContext(StyleStateContext);
  if (context === undefined) {
    throw new Error('useStyleState must be used within a StyleProvider');
  }
  return context;
}

function useStyleDispatch() {
  const context = React.useContext(StyleDispatchContext);
  if (context === undefined) {
    throw new Error('useStyleDispatch must be used within a StyleProvider');
  }
  return context;
}

function useStyle(): [State, Dispatch] {
  return [useStyleState(), useStyleDispatch()];
}

export { StyleProvider, useStyleState, useStyleDispatch, useStyle };
