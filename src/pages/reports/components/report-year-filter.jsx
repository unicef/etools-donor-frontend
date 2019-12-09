import { FORM_CONFIG } from 'lib/constants';
import { selectYears } from 'selectors/collections';
import DropdownFilterFactory from '../lib/dropdown-filter-factory';

export default DropdownFilterFactory(selectYears, FORM_CONFIG.reportYear.label);
