import axios from 'axios';
import { getCookie } from './helpers';
const backendPath = '/api';

const getBaseOptions = () => ({
  headers: {
    'X-CSRFToken': getCookie('csrftoken')
  },
  withCredentials: true
});

async function get(uri, params = {}, options = getBaseOptions()) {
  const opt = { method: 'GET', params };
  try {
    const response = await axios.get(`${backendPath}${uri}`, { ...opt, ...options });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function post(uri, body = {}) {
  try {
    const response = await axios.post(`${backendPath}${uri}`, body, getBaseOptions());
    return response.data;
  } catch (err) {
    throw err;
  }
}

export function getUserRoles(params) {
  return get(process.env.REACT_APP_USER_ROLES_ENDPOINT, params);
}

export function getUserGroups() {
  return get(process.env.REACT_APP_USER_GROUPS_ENDPOINT, { search: 'Donor' });
}

export function getDonors() {
  return get(process.env.REACT_APP_REPORTS_DONORS_ENDPOINT);
}

export function getAdminDonors() {
  return get(process.env.REACT_APP_REPORTS_DONORS_ENDPOINT);
}

export async function createUser(user) {
  const url = process.env.REACT_APP_USERS_ENDPOINT;
  const res = await post(url, user);
  return res;
}
export async function createRole(role) {
  const url = process.env.REACT_APP_USER_ROLES_ENDPOINT;
  const res = await post(url, role);
  return res;
}

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

export function getStaticAssets() {
  return get(process.env.REACT_APP_USER_STATIC_ENDPOINT);
}

export function getUserProfile() {
  return get(process.env.REACT_APP_PROFILE_ENDPOINT);
}
