import axios from 'axios';

const GET_SERVICES = 'GET_SERVICES';

const getServices = services => ({ type: GET_SERVICES, services });

export function fetchServices() {
  return function thunk(dispatch) {
    return axios.get('/api/services')
      .then(res => res.data)
      .then(services => dispatch(getServices(services)))
      .catch(err => console.log(err));
  };
}

export default function reducer(services = [], action) {
  switch (action.type) {
    case GET_SERVICES:
      return action.services;
    default:
      return services;
  }
}
