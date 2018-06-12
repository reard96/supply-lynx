import Business from '../../build/contracts/Business.json';
const contract = require('truffle-contract');
const agreementStorage = contract(Business);

const defaultContract = {};

const GET_CONTRACT = 'GET_CONTRACT';

const setContract = contract => ({ type: GET_CONTRACT, contract });

export const fetchContract = web3 => {
  web3.currentProvider && agreementStorage.setProvider(web3.currentProvider);
  return dispatch =>
    agreementStorage
      .deployed()
      .then(contract => dispatch(setContract(contract)));
};

export default function (state = defaultContract, action) {
  switch (action.type) {
    case GET_CONTRACT:
      return action.contract;
    default:
      return state;
  }
}
