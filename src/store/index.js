import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import web3 from './web3';
import contract from './contract';
import user from './user';
import users from './users';
import service from './service';
import services from './services';
import orders from './orders';

export const reducer = combineReducers({ web3, orders, contract, services, users, service, user });

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
const store = createStore(reducer, middleware);

export default store;
export * from './web3';
export * from './contract';
export * from './user';
export * from './users';
export * from './service';
export * from './services';
export * from './orders';
