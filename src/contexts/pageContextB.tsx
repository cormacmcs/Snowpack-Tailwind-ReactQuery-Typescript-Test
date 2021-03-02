import CreateContext from '@app/contexts/ContextCreator';

type State = { pageA: number; pageB: string };

const initialState: State = { pageA: 0, pageB: '0' };

function pageReducer(state: State, action): State {
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

// const logger = (wrappedReducer) => {
//   return function reducer(state, action) {
//     const nextState = wrappedReducer(state, action);
//     console.group(action.type);
//     console.log(`%c prev state`, `color: #DD4533; font-weight: bold`, state);
//     console.log(`%c action`, `color: #9D457A; font-weight: bold`, action);
//     console.log(`%c next state`, `color: #5BBC34; font-weight: bold`, nextState);
//     console.groupEnd();
//     return nextState;
//   };
// };

const Context = CreateContext(initialState, pageReducer, actions);

export const PageProvider = Context.ContextProvider;
export const usePageState = Context.useContextState;
export const usePageActions = Context.useContextActions;
export const usePage = Context.useContext;
export default Context;
