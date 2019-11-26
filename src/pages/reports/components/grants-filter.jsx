import React from 'react';
import PropTypes from 'prop-types';
import { FORM_CONFIG } from 'lib/constants';
import { selectGrants } from 'selectors/collections';
import SearchableDropdownFilterFactory from '../lib/searchable-dropdown-filter-factory';
import { prop } from 'ramda';
import { QUERY_PROPERTY_GRANT } from '../constants';

export default function GrantsFilter({ ...props }) {
  const getOptionLabel = prop(QUERY_PROPERTY_GRANT);

  const Component = SearchableDropdownFilterFactory(
    selectGrants,
    FORM_CONFIG.grant.label,
    getOptionLabel
  );

  return <Component getOptionLabel={getOptionLabel} {...props} />;
}

GrantsFilter.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
};

export function getGrantDisplay(grant) {
  return grant.category ? `${grant.category}-${grant.code}` : grant.code;
}
