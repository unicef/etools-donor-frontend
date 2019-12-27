import React from 'react';
import PropTypes from 'prop-types';
import { propOr } from 'ramda';
import { FORM_CONFIG } from 'lib/constants';
import { selectExternalGrants } from 'selectors/collections';
import { QUERY_PROPERTY_GRANT } from '../constants';
import SearchableDropdownFilterFactory from '../lib/searchable-dropdown-filter-factory';

export default function ExternalGrantsFilter({ ...props }) {
  const getOptionLabel = propOr('', QUERY_PROPERTY_GRANT);

  const Component = SearchableDropdownFilterFactory(
    selectExternalGrants,
    FORM_CONFIG.externalGrant.label,
    getOptionLabel
  );

  return <Component getOptionLabel={getOptionLabel} {...props} />;
}

ExternalGrantsFilter.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
};
