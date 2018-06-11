import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import web3 from './web3'
import accounts from './accounts'
import contract from './contract'
import services from './services'
import users from './users'
import singleService from './singleService'
import user from './user'
import orders from './orders'

export const reducer = combineReducers({ web3, orders, accounts, contract, services, users, singleService, user })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './orders'
export * from './web3'
export * from './accounts'
export * from './contract'
export * from './services'
export * from './users'
export * from './singleService'
export * from './user'
