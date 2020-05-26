import React from 'react';
import axios from 'axios';
import {ADD_TO_PORTFOLIO_INPROGRESS, ADD_TO_PORTFOLIO_ERROR, ADD_TO_PORTFOLIO_SUCCESS} from './../constants/ActionTypes';

export const addToPortfolioInProgressAction = () => {
    return {
        type: ADD_TO_PORTFOLIO_INPROGRESS,
    }
}

export const addToPortfolioErrorAction = (error) => {
    return {
        type: ADD_TO_PORTFOLIO_ERROR,
        error,
    }
}

export const addToPortfolioSuccessAction = (data) => {
    return {
        type:ADD_TO_PORTFOLIO_SUCCESS,
        
    }
}


export const addToPortfolio = (ticker,dispatch) => {
    dispatch(addToPortfolioInProgressAction());
    try {

    }
    catch(err) {
        console.log(err);
    }
} 