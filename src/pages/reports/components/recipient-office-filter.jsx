import React from 'react';
import { prop } from 'ramda';
import { selectOffices } from 'selectors/collections';
import { FORM_CONFIG } from 'lib/constants';
import SearchableDropdownFilterFactory, {
  FilterProps
} from '../lib/searchable-dropdown-filter-factory';

export default function RecipientOfficeFilter({ ...props }) {
  const getLabel = prop('name');

  const Component = SearchableDropdownFilterFactory(
    selectOffices,
    FORM_CONFIG.offices.label,
    getLabel
  );

  return <Component getOptionLabel={getLabel} {...props} />;
}

RecipientOfficeFilter.propTypes = FilterProps;
