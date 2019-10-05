import axios from 'axios';
import { getCookie } from './helpers';
import qs from 'qs';
const host = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api`;

const getBaseOptions = () => ({
  headers: {
    'X-CSRFToken': getCookie('csrftoken')
  }
  // paramsSerializer: function(params) {
  //   return qs.stringify(params, { arrayFormat: 'comma' });
  // }
  // withCredentials: true
});

async function get(uri, params = {}, options = getBaseOptions()) {
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
    const response = axios.post(`${host}${uri}`, body, getBaseOptions());
    return response.data;
  } catch (err) {
    throw err;
  }
}

export function getUserRoles(params) {
  return get(process.env.REACT_APP_USER_ROLES_ENDPOINT, params);
}

export function getUserGroups() {
  return get(process.env.REACT_APP_USER_GROUPS_ENDPOINT);
}

export function getDonors() {
  return get(process.env.REACT_APP_REPORTS_DONORS_ENDPOINT);
}

export function getAdminDonors() {
  return get(process.env.REACT_APP_REPORTS_DONORS_ENDPOINT);
}
// export function getAdminDonors() {
//   return get(process.env.REACT_APP_ADMIN_DONORS_ENDPOINT);
// }

export function getGrants(id) {
  const url = process.env.REACT_APP_GRANTS_ENDPOINT.replace('<donor_id>', id);
  return get(url);
}

export function getExternalGrants(id) {
  const url = process.env.REACT_APP_EXTERNAL_GRANTS_ENDPOINT.replace('<donor_id>', id);
  return get(url);
}

export function getThemes() {
  return get(process.env.REACT_APP_THEMES_ENDPOINT);
}
