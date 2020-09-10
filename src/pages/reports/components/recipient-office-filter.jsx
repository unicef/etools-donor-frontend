import React from 'react';
import { propOr } from 'ramda';
import { selectOffices } from 'selectors/collections';
import { FORM_CONFIG } from 'lib/constants';
import SearchableDropdownFilterFactory, {
  FilterProps
} from '../lib/searchable-dropdown-filter-factory';
import { QUERY_PROPERTY_RECIPIENT_OFFICE } from '../constants';

export default function RecipientOfficeFilter({ ...props }) {
  const getLabel = propOr('', QUERY_PROPERTY_RECIPIENT_OFFICE);

  const Component = SearchableDropdownFilterFactory(
    selectOffices,
    FORM_CONFIG.offices.label,
    getLabel
  );

  return <Component getOptionLabel={getLabel} {...props} />;
}

RecipientOfficeFilter.propTypes = FilterProps;
