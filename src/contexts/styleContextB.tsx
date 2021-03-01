import CreateContext from '@app/react-provide-context';

type State = { shiny: boolean; dark: boolean };

const initialState: State = { shiny: false, dark: false };

function styleReducer(state: State, action): State {
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

const Context = CreateContext(initialState, styleReducer);

export const StyleProvider = Context.ContextProvider;
export const useStyleState = Context.useContextState;
export const useStyleDispatch = Context.useContextDispatch;
export const useStyle = Context.useContextReducer;
export default Context;
