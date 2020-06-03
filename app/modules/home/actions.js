import axios from 'axios';
import * as home from './constants';

export function getNewsHeadlines(country = 'us') {
  return (dispatch) => {
    dispatch({type: home.RETRIEVING_HEADLINES});
    return new Promise((resolve, reject) => {
      const url = `${home.API_URL}country=${country}&apiKey=${home.API_KEY}&pageSize=20`;
      axios.get(url)
      .then(res => res.data)
      .then((data) => {
        dispatch({type: home.HEADLINES_AVAILABLE, data});
        resolve();
      })
      .catch(error => {
        dispatch({type: home.HEADLINES_ERROR, error});
        reject();
      });
    })
  };
}

export function getHeadlinesBySource(source) {
  return (dispatch) => {
    dispatch({type: home.RETRIEVING_HEADLINES});
    return new Promise((resolve, reject) => {
      const url = `${home.API_URL}sources=${source}&apiKey=${home.API_KEY}&pageSize=20`;
      axios.get(url)
      .then(res => res.data)
      .then((data) => resolve(data))
      .catch(error => reject(error));
    })
  };
}
