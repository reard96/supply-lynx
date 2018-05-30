import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import store from './store';
import Main from './components/Main';

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  app
);
