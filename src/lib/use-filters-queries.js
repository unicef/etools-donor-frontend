import {
  useState,
  useEffect
} from 'react';

import {
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  DATE_FORMAT
} from 'pages/reports/constants';

import {
  format,
  subYears
} from 'date-fns';

import {
  mapObjIndexed,
  keys,
  pickBy,
  always,
  equals
} from 'ramda';
import useQuery from './use-query';
import {
  hasValue,
  parseEventValue
} from './helpers';

/*
  This hook encapsulates the flow of handling data when a filter is selected to be activated,
  when a filter value is changed, and when page is loaded initially while coninuously being
  in sync with the url params.
*/
const useFiltersQueries = FILTERS_MAP => {
  const initialFiltersActiveState = mapObjIndexed(always(false), FILTERS_MAP); // set which filters are active on load
  let initialFilterValues = mapObjIndexed(always(''), FILTERS_MAP); // set default filter values
  const today = new Date();
  const lastYearAfterDate = subYears(today, 1);
  initialFilterValues[REPORT_END_DATE_BEFORE_FIELD] = format(today, DATE_FORMAT)
  initialFilterValues[REPORT_END_DATE_AFTER_FIELD] = format(lastYearAfterDate, DATE_FORMAT)

  // filtersActiveState is object in form of {[filterName]: bool} indicating if filter has been selected
  const [filtersActiveState, setFiltersActiveState] = useState(initialFiltersActiveState);

  // names(keys) of selected filters for easy iteration on render
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [filterValues, setFilterValues] = useQuery(useState(initialFilterValues));

  // On intiial render grab filter values from url params if any and
  // update the active filters object
  useEffect(() => {
    const filtersFromUrl = pickBy(isValidQuery, filterValues);
    const activatedFilters = mapObjIndexed(always(true), filtersFromUrl);
    const nedActiveState = {
      ...filtersActiveState,
      ...activatedFilters
    };
    setFiltersActiveState(nedActiveState);
  }, []);

  // Render filters in UI if any are activated by effect run on initial render
  useEffect(() => {
    if (equals(filtersActiveState, initialFiltersActiveState) && !selectedFilters.length) {
      return;
    }
    const onlyActiveFilters = keys(filtersActiveState).filter(key => filtersActiveState[key]);
    setSelectedFilters(onlyActiveFilters);

    setQueryFromActiveFilters();
  }, [filtersActiveState]);

  // Resets the value of a filter if we remove it from selectedFilters
  function setQueryFromActiveFilters() {
    const resetValueForInactive = (value, key) => {
      if (filtersActiveState[key]) {
        return filterValues[key];
      }
      return '';
    };

    const nextFilterValues = mapObjIndexed(resetValueForInactive, filterValues);
    setFilterValues(nextFilterValues);
  }

  function clearFilters() {
    setFiltersActiveState(initialFiltersActiveState);
  }

  // used by dropdown to set filter value
  const handleChangeFilterValue = filterName => value => {
    setFilterValues({
      ...filterValues,
      [filterName]: parseEventValue(value)
    });
  };

  function handleSelectFilter(filterName) {
    return () => {
      setFiltersActiveState({
        ...filtersActiveState,
        [filterName]: !filtersActiveState[filterName]
      });
    };
  }

  // removes queries from url that aren't in the initialFilterValues provided by consumer
  function isValidQuery(value, key) {
    return hasValue(value) && key in initialFiltersActiveState;
  }

  return {
    filtersActiveState,
    filterValues,
    selectedFilters,
    handleSelectFilter,
    handleChangeFilterValue,
    clearFilters,
    setSelectedFilters
  };
};

export default useFiltersQueries;
