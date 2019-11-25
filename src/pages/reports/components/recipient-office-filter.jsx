import { FORM_CONFIG } from 'lib/constants';
import { selectOffices } from 'selectors/collections';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';

export default DropdownMultiFilterFactory(selectOffices, FORM_CONFIG.offices.label, 'name');
