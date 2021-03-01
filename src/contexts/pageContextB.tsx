import CreateContext from '@app/react-provide-context';

type State = { pageA: number; pageB: string };

const initialState: State = { pageA: 0, pageB: '0' };

function pageReducer(state, action) {
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

const actions = (dispatch) => ({
  setA: (value: number) => dispatch({ type: 'setA', value }),
  setB: (value: string) => dispatch({ type: 'setB', value }),
});

const Context = CreateContext(initialState, pageReducer, actions);

export const PageProvider = Context.ContextProvider;
export const usePageState = Context.useContextState;
export const usePageActions = Context.useContextActions;
export const usePage = Context.useContext;
export default Context;
