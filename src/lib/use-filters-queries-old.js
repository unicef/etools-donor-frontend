import {
  useState,
  useEffect
} from 'react';

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
const useFiltersQueriesOld = FILTERS_MAP => {
  const initialFiltersActiveStateOld = mapObjIndexed(always(false), FILTERS_MAP); // set which filters are active on load
  const initialFilterValuesOld = mapObjIndexed(always(''), FILTERS_MAP); // set default filter values

  // filtersActiveState is object in form of {[filterName]: bool} indicating if filter has been selected
  const [filtersActiveStateOld, setFiltersActiveStateOld] = useState(initialFiltersActiveStateOld);

  // names(keys) of selected filters for easy iteration on render
  const [selectedFiltersOld, setSelectedFiltersOld] = useState([]);

  const [filterValuesOld, setFilterValuesOld] = useQuery(useState(initialFilterValuesOld));
  console.log(initialFilterValuesOld)
  console.log(filterValuesOld)

  // On intiial render grab filter values from url params if any and
  // update the active filters object
  useEffect(() => {
    const filtersFromUrl = pickBy(isValidQuery, filterValuesOld);
    const activatedFilters = mapObjIndexed(always(true), filtersFromUrl);
    const nedActiveState = {
      ...filtersActiveStateOld,
      ...activatedFilters
    };
    console.log(filtersFromUrl, activatedFilters)
    setFiltersActiveStateOld(nedActiveState);
  }, []);

  // Render filters in UI if any are activated by effect run on initial render
  useEffect(() => {
    if (equals(filtersActiveStateOld, initialFiltersActiveStateOld) && !selectedFiltersOld.length) {
      return;
    }
    const onlyActiveFilters = keys(filtersActiveStateOld).filter(key => filtersActiveStateOld[key]);
    setSelectedFiltersOld(onlyActiveFilters);

    setQueryFromActiveFilters();
  }, [filtersActiveStateOld]);

  // Resets the value of a filter if we remove it from selectedFilters
  function setQueryFromActiveFilters() {
    const resetValueForInactive = (value, key) => {
      if (filtersActiveStateOld[key]) {
        return filterValuesOld[key];
      }
      return '';
    };

    const nextFilterValues = mapObjIndexed(resetValueForInactive, filterValuesOld);
    setFilterValuesOld(nextFilterValues);
  }

  function clearFilters() {
    setFiltersActiveStateOld(initialFiltersActiveStateOld);
  }

  // used by dropdown to set filter value
  const handleChangeFilterValue = filterName => value => {
    setFilterValuesOld({
      ...filterValuesOld,
      [filterName]: parseEventValue(value)
    });
  };

  function handleSelectFilter(filterName) {
    return () => {
      setFiltersActiveStateOld({
        ...filtersActiveStateOld,
        [filterName]: !filtersActiveStateOld[filterName]
      });
    };
  }

  // removes queries from url that aren't in the initialFilterValuesOld provided by consumer
  function isValidQuery(value, key) {
    return hasValue(value) && key in initialFiltersActiveStateOld;
  }

  return {
    filtersActiveStateOld,
    filterValuesOld,
    selectedFiltersOld,
    handleSelectFilter,
    handleChangeFilterValue,
    clearFilters,
    setSelectedFiltersOld
  };
};

export default useFiltersQueriesOld;
