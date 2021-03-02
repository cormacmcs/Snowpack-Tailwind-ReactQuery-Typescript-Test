import CreateContext, { useMetaReducers } from '@app/react-provide-context';

const logger = (reducer) => {
  return (state, action) => {
    const nextState = reducer(state, action);
    console.group(action.type);
    console.log(`%c prev state`, `color: #DD4533; font-weight: bold`, state);
    console.log(`%c action`, `color: #9D457A; font-weight: bold`, action);
    console.log(`%c next state`, `color: #5BBC34; font-weight: bold`, nextState);
    console.groupEnd();
    return nextState;
  };
};

export default useMetaReducers(CreateContext, [logger]);
