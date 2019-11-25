import { selectOffices } from 'selectors/collections';
import { FORM_CONFIG } from 'lib/constants';
import SearchableDropdownFilterFactory from '../lib/searchable-dropdown-filter-factory';

export default SearchableDropdownFilterFactory(selectOffices, FORM_CONFIG.offices.label, 'name');
