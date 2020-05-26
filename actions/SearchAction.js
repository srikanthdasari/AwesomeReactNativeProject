import axios from 'axios';
import {
  SEARCH_INPROGRESS,
  SEARCH_ERROR,
  SEARCH_SUCCESS,
  SEARCH_STRING,
} from './../constants/ActionTypes';

import {ENDPOINT} from './../constants/Endpoint';
import {UrlBuilder, ServiceEndpoint} from './../utils/UrlBuilder';
import _ from 'lodash';
export const searchInprogressAction = () => {
  return {
    type: SEARCH_INPROGRESS,
  };
};

export const searchErrorAction = (error) => {
  return {
    type: SEARCH_ERROR,
    error,
  };
};

export const searchSuccessAction = (data) => {
  return {
    type: SEARCH_SUCCESS,
    data,
  };
};

export const searchString = (ticker) => {
  return {
    type: SEARCH_STRING,
    ticker,
  };
};

export const getTickerSearch = async (tickerSearchString, dispatch) => {
  // console.log(tickerSearchString);
  // console.log(dispatch);
  dispatch(searchInprogressAction());

  if (tickerSearchString) {
    const compiled = _.template(ENDPOINT.SEARCH_ENDPOINT);
    const urlObj = new UrlBuilder()
      .setBaseUrl()
      .setEndpoint(compiled({fragment: tickerSearchString}))
      .setPublicToken()
      // .setQuery(tickerSearchString)
      .build();

    console.log(urlObj.getUrl());
    await axios
      .get(urlObj.getUrl())
      .then((resp) => {
        // console.log(resp.data);
        const data = resp.data.map((x) => {
          return {
            symbol: x.symbol,
            securityName: x.securityName,
            securityType: x.securityType,
            region: x.region,
            exchange: x.exchange,
          };
        });
        dispatch(searchString(tickerSearchString));
        dispatch(searchSuccessAction(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(searchErrorAction(err));
      });
  } else {
    dispatch(searchString(undefined));
    dispatch(searchSuccessAction([]));
  }
};
