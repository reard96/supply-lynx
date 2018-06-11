import axios from "axios"

const GET_USER = "GET_USER"

export function getUser(user) {
  return { type: GET_USER, user }
}

export function fetchUser(address) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${address}`)
      .then(res => res.data)
      .then(user => dispatch(getUser(user)))
      .catch(err => console.log(err));
  }
}

export default function reducer(user = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return user;
  }
}

