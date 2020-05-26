import {useReducer, useRef, useMemo, useCallback} from 'react';

// https://blog.emumba.com/usereducer-with-logger-and-thunk-middlewares-customhook-907e0b87082f
export const useCustomReducer = (reducerFunc, initialState, enableLogger) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const preState = useRef();

  const dispatchWithLogging = useCallback((action) => {
    if (typeof action === 'function') {
      return action(dispatchWithLogging, () => preState.state);
    }

    const actionType = typeof action === 'object' ? action.type : action;

    preState.current.actions = preState.current.actions || [];
    preState.current.actions.push({actionType, action});
    // preState.current = {...preState.current, actionType, action};

    dispatch(action);
  }, []);

  const customDispatch = enableLogger ? dispatchWithLogging : dispatch;

  useMemo(
    function logStateAfterChange() {
      if (!enableLogger || !preState.current) {
        return;
      }

      for (let i = 0; i < preState.current.actions.length; i++) {
        const {
          actionType,
          state: previousState,
          action,
        } = preState.current.actions[i];
        console.groupCollapsed(`${actionType}`);
        console.log('%c Previous State', 'color: red', previousState);
        console.log('%c Action', 'color: blue', action);
        console.log('%c Current State', 'color: green', state);
        console.groupEnd();
      }
      // const {actionType, state: previousState, action} = preState.current;
    },
    [state, enableLogger],
  );

  preState.current = {...preState.current, state};

  return [state, customDispatch];
};
