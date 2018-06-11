import axios from 'axios';

const GET_USERS = 'GET_USERS';

const getUsers = users => ({ type: GET_USERS, users });

export function fetchUsers() {
  return function thunk(dispatch) {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(getUsers(users)))
      .catch(err => console.log(err));
  };
}

export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return users;
  }
}
