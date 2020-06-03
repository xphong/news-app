import * as home from './constants';

const initialState = {
  isFetching: true,
  articles: [],
  hasError: false,
  errorMsg: ''
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case home.RETRIEVING_HEADLINES:{
      const isFetching = (state.articles.length > 0) ? false : true;

      return {...state, isFetching, hasError:false};
    }
    case home.HEADLINES_AVAILABLE:{
      const { articles } = action.data;

      return {...state, isFetching:false, articles, hasError:false};
    }
    case home.HEADLINES_ERROR:{
      const error = action.error;

      return {...state, isFetching:false, hasError:true, errorMsg:error};
    }
    default:
      return state;
  }
};

export default homeReducer;
