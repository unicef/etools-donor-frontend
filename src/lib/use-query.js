import { useLocation, useHistory } from 'react-router-dom';
import { pickBy } from 'ramda';
import { hasValue } from './helpers';

function parseQuery(search) {
  const params = new URLSearchParams(search);
  const entries = params.entries();
  const object = {};
  for (const [key, value] of entries) {
    try {
      object[key] = JSON.parse(value);
    } catch (err) {
      object[key] = value;
    }
  }
  return object;
}

function stringifyQuery(query) {
  return new URLSearchParams(query).toString();
}

export default function useQuery([defaultQuery, setValue], method = 'replace') {
  const history = useHistory();
  const { search, pathname, hash } = useLocation();
  const hasParams = search.indexOf('=') > -1;

  const setValueWithQuery = newQuery => {
    const nonEmpties = pickBy(hasValue, newQuery);
    const search = stringifyQuery(nonEmpties);
    setValue(newQuery);
    history[method](pathname + '?' + search + hash);
  };

  return [hasParams ? { ...defaultQuery, ...parseQuery(search) } : defaultQuery, setValueWithQuery];
}
