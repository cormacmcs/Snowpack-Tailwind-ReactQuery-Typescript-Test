import * as React from 'react';

type ContextProviderProps = { children: React.ReactNode };
type Action = { type: string };
type KeyFrom<X> = keyof X;
type Actions<T> = { [key in KeyFrom<T>]: () => void };
type Dispatch = React.Dispatch<React.SetStateAction<any>>;
type ActionDispatch<O> = (dispatch: Dispatch) => Actions<O>;

type ReducerFunc = (state: any, action: any) => any;
type Reducer<R extends ReducerFunc> = (state: ReturnType<R>, action: Action) => ReturnType<R>;
type MetaReducer = (reducer: any) => <C extends Object>(state: C, action: any) => C;

// TODO: Fix typing for Reducer

const CreateContext = <
  L extends any,
  I extends ActionDispatch<L>,
  S extends ReducerFunc,
  Q extends Reducer<S>,
  U extends ReturnType<Reducer<S>>
>(
  initialState: U,
  reducer: Q,
  actions?: I,
  meta?: MetaReducer | MetaReducer[]
) => {
  const ContextStateContext = React.createContext<U | undefined>(undefined);
  const ContextDispatchContext = React.createContext(undefined);
  const ContextActionsContext = actions && React.createContext<ReturnType<I> | undefined>(undefined);
  const metaReducers = meta instanceof Array ? meta : [meta];
  const reducerReducer = (accumulatedReducer, wrappingReducer) => wrappingReducer(accumulatedReducer);

  function ContextProvider({ children }: ContextProviderProps) {
    let usedReducer = reducer as any;
    if (meta) {
      usedReducer = React.useCallback(metaReducers.reduce(reducerReducer, reducer), [metaReducers]);
    }
    const [state, dispatch] = React.useReducer(usedReducer as any, initialState) as [U, Dispatch];
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
      throw new Error('useContextState must be used within its ContextProvider');
    }
    return context;
  }

  function useContextDispatch(): Dispatch {
    const context = React.useContext(ContextDispatchContext);
    if (context === undefined) {
      throw new Error('useContextDispatch must be used within its ContextProvider');
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
        throw new Error('useContextActions must be used within its ContextProvider');
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

type ContextCreator = typeof CreateContext;

export const assignMetaReducers = (
  creator: ContextCreator,
  defaultMeta: MetaReducer | MetaReducer[]
): ContextCreator => {
  return <
    L extends any,
    I extends ActionDispatch<L>,
    S extends ReducerFunc,
    Q extends Reducer<S>,
    U extends ReturnType<Reducer<S>>
  >(
    initialState: U,
    reducer: Q,
    actions?: I,
    meta?: MetaReducer | MetaReducer[]
  ) => {
    let metaReducer = [];
    if (defaultMeta) {
      const defaultMetaArr = defaultMeta instanceof Array ? defaultMeta : [defaultMeta];
      metaReducer = [...defaultMetaArr];
    }
    if (meta) {
      const metaArr = meta instanceof Array ? meta : [meta];
      metaReducer = [...metaReducer, ...metaArr];
    }
    return creator(initialState, reducer, actions, metaReducer);
  };
};

export default CreateContext;
