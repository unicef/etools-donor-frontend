import axios from 'axios';
import {
  getCookie
} from './helpers';
import Qs from 'qs';

const backendPath = '/api';

const getBaseOptions = () => ({
  headers: {
    'X-CSRFToken': getCookie('csrftoken')
  },

  withCredentials: true,
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'comma'
    });
  }
});

export async function get(uri, params = {}, options = getBaseOptions()) {
  const opt = {
    method: 'GET',
    params
  };
  const response = await axios.get(`${backendPath}${uri}`, {
    ...opt,
    ...options
  });
  return response.data;
}

export async function fetchSearchReports(params) {
  params = {
    ...params
  }
  const computedUrl = process.env.REACT_APP_SEARCH_API;
  return get(computedUrl, params);
}
