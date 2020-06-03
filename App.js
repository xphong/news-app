import * as React from 'react';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import Router from './app/config/routes';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
