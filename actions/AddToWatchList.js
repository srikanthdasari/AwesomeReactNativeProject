import {
  ADD_TO_WATCHLIST_INPROGRESS,
  ADD_TO_WATCHLIST_ERROR,
  ADD_TO_WATCHLIST_SUCCESS,
} from './../constants/ActionTypes';
import {
  storeData,
  getData,
  removeItemValue,
} from '../utils/AsyncStorageWrapper';
import {WATCHLIST} from './../constants/storage-keys';
import _ from 'lodash';
export const addToWatchListInProgressAction = () => {
  return {
    type: ADD_TO_WATCHLIST_INPROGRESS,
  };
};

export const addToWatchListErrorAction = (error) => {
  return {
    type: ADD_TO_WATCHLIST_ERROR,
    error,
  };
};

export const addToWatchListSuccessAction = (data) => {
  return {
    type: ADD_TO_WATCHLIST_SUCCESS,
    data,
  };
};

export const addToWatchList = async (ticker, dispatch) => {
  dispatch(addToWatchListInProgressAction());
  if (ticker) {
    try {
      // await removeItemValue(WATCHLIST);
      const existingData = await getData(WATCHLIST);
      let data = [];
      if (existingData) {
        data = [...existingData, ticker];
      } else {
        data = [ticker];
      }
      console.log(data);
      await storeData(WATCHLIST, _.uniq(data));
      dispatch(addToWatchListSuccessAction(data));
    } catch (e) {
      dispatch(addToWatchListErrorAction(e));
    }
  }
};
