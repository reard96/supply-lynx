import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

import users from './users';

const reducer = combineReducers({
  users
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

// export { };
