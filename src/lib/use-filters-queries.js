import { useState, useEffect } from 'react';
import { mapObjIndexed, keys, pickBy, always, equals } from 'ramda';
import useQuery from './use-query';
import { hasValue } from './helpers';

/*
  This hook encapsulates the flow of handling data when a filter is selected to be activated,
  when a filter value is changed, and when page is loaded initially while coninuously being
  in sync with the url params.
*/
const useFiltersQueries = ({ initialFilterValues, initialFiltersActiveState }) => {
  // filtersActiveState is object in form of {[filterName]: bool} indicating if filter has been selected
  const [filtersActiveState, setFiltersActiveState] = useState(initialFiltersActiveState);

  // names(keys) of selected filters for easy iteration on render
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [filterValues, setFilterValues] = useQuery(useState(initialFilterValues));

  // On intiial render grab filter values from url params if any and
  // update the active filters object
  useEffect(() => {
    const filtersFromUrl = pickBy(hasValue, filterValues);
    const activatedFilters = mapObjIndexed(always(true), filtersFromUrl);
    setFiltersActiveState({ ...filtersActiveState, ...activatedFilters });
  }, []);

  // Render filters in UI if any are activated by effect run on initial render
  useEffect(() => {
    if (equals(filtersActiveState, initialFiltersActiveState)) {
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

  function parseValue(valueObj) {
    if (valueObj.target) {
      return valueObj.target.value;
    }
    return valueObj;
  }

  // used by dropdown to set filter value
  const handleFilter = filterName => value => {
    setFilterValues({
      ...filterValues,
      [filterName]: parseValue(value)
    });
  };

  const handleSelectFilter = filterName => () => {
    setFiltersActiveState({
      ...filtersActiveState,
      [filterName]: !filtersActiveState[filterName]
    });
  };

  return {
    filtersActiveState,
    filterValues,
    selectedFilters,
    setFilterValues,
    handleSelectFilter,
    handleFilter
  };
};

export default useFiltersQueries;
