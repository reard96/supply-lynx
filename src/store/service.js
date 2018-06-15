import axios from 'axios';

const GET_SERVICE = 'GET_SERVICE';

export function getService(service) {
    return {
        type: GET_SERVICE,
        service
    };
}

export function fetchService(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/services/${id}`)
            .then(res => res.data)
            .then(service => dispatch(getService(service)))
            .catch(err => console.log(err));
    };
}

export default function reducer(service = {}, action) {
    switch (action.type) {
        case GET_SERVICE:
            return action.service;
        default:
            return service;
    }
}

