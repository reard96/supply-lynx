const defaultAccounts = [];

const GET_ACCOUNTS = 'GET_ACCOUNTS';

const setAccounts = accounts => ({ type: GET_ACCOUNTS, accounts });

export const fetchAccounts = web3 => {
  return dispatch =>
    web3.eth.getAccounts((err, accounts) => dispatch(setAccounts(accounts)));
};

export default function (state = defaultAccounts, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.accounts;
    default:
      return state;
  }
}
