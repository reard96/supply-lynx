import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import store from './store';
import Main from './components/Main';

const app = document.getElementById('app');

// if (document.location.search.indexOf('token=') === 1) {
//   const token = document.location.search.slice(1).split('&')[0].split('token=')[1];
//   window.localStorage.setItem('token', token);
//   window.location = '/';
// }

render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  app
);
