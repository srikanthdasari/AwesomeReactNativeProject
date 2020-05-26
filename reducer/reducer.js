import {
  SEARCH_INPROGRESS,
  SEARCH_ERROR,
  SEARCH_SUCCESS,
  SEARCH_STRING,
  LOAD_WATCHLIST_ERROR,
  LOAD_WATCHLIST_INPROGRESS,
  LOAD_WATCHLIST_SUCCESS,
  ADD_TO_WATCHLIST_INPROGRESS,
  ADD_TO_WATCHLIST_ERROR,
  ADD_TO_WATCHLIST_SUCCESS,
} from './../constants/ActionTypes';
import {initialState} from './../store/store';

const reducer = (state = initialState, {type, data, error, ticker} = {}) => {
  switch (type) {
    case LOAD_WATCHLIST_INPROGRESS:
    case SEARCH_INPROGRESS:
    case ADD_TO_WATCHLIST_INPROGRESS:
      return {
        ...state,
        status: type,
      };
    case LOAD_WATCHLIST_ERROR:
    case SEARCH_ERROR:
    case ADD_TO_WATCHLIST_ERROR:
      return {
        ...state,
        status: type,
        error,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        status: SEARCH_SUCCESS,
        searchResults: data,
      };
    case SEARCH_STRING:
      return {
        ...state,
        status: SEARCH_STRING,
        searchString: ticker,
      };
    case LOAD_WATCHLIST_SUCCESS:
      return {
        ...state,
        status: type,
        watchList: data,
      };
    case ADD_TO_WATCHLIST_SUCCESS:
      return {
        ...state,
        status: type,
      };
    default:
      return state;
  }
};

export default reducer;
