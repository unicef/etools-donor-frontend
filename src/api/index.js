import axios from 'axios';
import { getCookie } from './helpers';

const host = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api`;

const options = {
    headers: {
        'X-CSRFToken': getCookie('csrftoken')
    },
    withCredentials: true
};

async function get(uri, params = {}, options = options) {
    const opt = { method: 'GET', params };
    try {
        const response = await axios.get(`${host}${uri}`, { ...opt, ...options });
        return response.data;
    } catch (err) {
        throw err;
    }
}

async function post(uri, body = {}) {
    try {
        const response = axios.post(`${host}${uri}`, body, options);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export function getUserRoles() {
    return get(process.env.REACT_APP_USER_ROLES_ENDPOINT);
}
