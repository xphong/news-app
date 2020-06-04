import * as appConstants from './constants';

const initialState = {
  isFetching: true,
  articles: [],
  hasError: false,
  errorMsg: '',
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
  case appConstants.RETRIEVING_HEADLINES:{
    const isFetching = (state.articles.length > 0) ? false : true;

    return { ...state, isFetching, hasError: false };
  }
  case appConstants.HEADLINES_AVAILABLE: {
    const { articles } = action.data;

    return { ...state, isFetching: false, articles, hasError: false };
  }
  case appConstants.HEADLINES_ERROR: {
    const error = action.error;

    return { ...state, isFetching: false, hasError: true, errorMsg: error };
  }
  default:
    return state;
  }
};

export default homeReducer;
