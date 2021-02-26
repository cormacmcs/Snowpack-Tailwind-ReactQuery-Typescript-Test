import * as React from 'react';

type ContextProviderProps = { children: React.ReactNode };
type Action = { type: string };
type KeyFrom<X> = keyof X;
type Actions<T> = { [key in KeyFrom<T>]: (value: any) => void };
type Dispatch = (action: Action) => void;
type ActionDispatch<O> = (dispatch: Dispatch) => Actions<O>;

type ReducerFunc = (state: any, action: any) => any;
type Reducer<R extends ReducerFunc> = (state: ReturnType<R>, action: Action) => ReturnType<R>;

const CreateContext = <
  L extends any,
  I extends ActionDispatch<L>,
  S extends ReducerFunc,
  Q extends Reducer<S>,
  U extends ReturnType<Reducer<S>>
>(
  initialState: U,
  reducer: Q,
  actions?: I
) => {
  const ContextStateContext = React.createContext<U | undefined>(undefined);
  const ContextDispatchContext = React.createContext(undefined);
  const ContextActionsContext = actions && React.createContext<ReturnType<I> | undefined>(undefined);

  function ContextProvider({ children }: ContextProviderProps) {
    const [state, dispatch] = React.useReducer(reducer as any, initialState) as [U, Dispatch];
    const actionObj = actions && (actions(dispatch) as ReturnType<I>);
    return (
      <ContextStateContext.Provider value={state}>
        <ContextDispatchContext.Provider value={dispatch}>
          {actions ? (
            <ContextActionsContext.Provider value={actionObj}>{children}</ContextActionsContext.Provider>
          ) : (
            children
          )}
        </ContextDispatchContext.Provider>
      </ContextStateContext.Provider>
    );
  }

  function useContextState(): U {
    const context = React.useContext(ContextStateContext);
    if (context === undefined) {
      throw new Error('useContextState must be used within a ContextProvider');
    }
    return context;
  }

  function useContextDispatch(): Dispatch {
    const context = React.useContext(ContextDispatchContext);
    if (context === undefined) {
      throw new Error('useContextDispatch must be used within a ContextProvider');
    }
    return context;
  }

  function useContextReducer(): [U, Dispatch] {
    return [useContextState(), useContextDispatch()];
  }

  function useContextActions(): ReturnType<I> {
    const context = React.useContext(ContextActionsContext);
    if (context === undefined) {
      if (!actions) {
        throw new Error('no actions have been provided in the creation of this ContextProvider');
      } else {
        throw new Error('useContextActions must be used within a ContextProvider');
      }
    }
    return context;
  }

  function useContext(): [U, ReturnType<I>] {
    if (!actions) {
      throw new Error('no actions have been provided in the creation of this ContextProvider');
    }
    return [useContextState(), useContextActions()];
  }

  return { ContextProvider, useContextState, useContextDispatch, useContextReducer, useContextActions, useContext };
};

export default CreateContext;
