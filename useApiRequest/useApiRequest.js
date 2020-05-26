// import * as react from 'react';
// import reducer from './../reducer/reducer';
// import {
//     initialState
// } from './../store/store';
// import axios from 'axios';

// const useApiRequest = (endpoint, {
//         verb = "get",
//         params = {}
//     } = {},
//     inprogressCallback,
//     successCallBack,
//     errorCallback) => {
//     const [state, dispatch] = react.useReducer(reducer, initialState);

//     const makeRequest = react.useCallback(async () => {
//         dispatch(inprogressCallback());

//         try {
//             const response = await axios[verb](endpoint, params);

//             dispatch(successCallBack(response));
//         } catch (err) {
//             dispatch(errorCallback(err));
//         }
//     }, [endpoint, verb, params]);

//     return [state, makeRequest];
// };

// export default useApiRequest;