import axios from 'axios';

const GET_USERS = 'GET_USERS';

export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
  }
  return users;
}

export const getUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users/all')
      .then(res => res.data)
      .then(users => {
        dispatch({ type: GET_USERS, users });
      });
  };
};
