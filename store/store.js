import React, {createContext, useContext} from 'react';
import reducer from './../reducer/reducer';
import {useCustomReducer} from './../utils/useCustomReducer';

const StoreContext = createContext();

export const initialState = {
  searchString: undefined,
  portfolio: [],
  searchResults: [],
  watchList: {},
  error: {},
  status: '',
};

export const StoreProvider = ({children}) => {
  const [state, dispatch] = useCustomReducer(reducer, initialState, true);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
