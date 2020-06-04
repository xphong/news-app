import axios from 'axios';
import * as appConstants from './constants';

export function getNewsHeadlines(country = 'us') {
  return (dispatch) => {
    dispatch({type: appConstants.RETRIEVING_HEADLINES});
    return new Promise((resolve, reject) => {
      const url = `${appConstants.API_URL}country=${country}&apiKey=${appConstants.API_KEY}&pageSize=20`;
      axios.get(url)
        .then(res => res.data)
        .then((data) => {
          dispatch({type: appConstants.HEADLINES_AVAILABLE, data});
          resolve();
        })
        .catch(error => {
          dispatch({type: appConstants.HEADLINES_ERROR, error});
          reject();
        });
    });
  };
}

export function getHeadlinesBySource(source) {
  return (dispatch) => {
    dispatch({type: appConstants.RETRIEVING_HEADLINES});
    return new Promise((resolve, reject) => {
      const url = `${appConstants.API_URL}sources=${source}&apiKey=${appConstants.API_KEY}&pageSize=20`;
      axios.get(url)
        .then(res => res.data)
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  };
}
