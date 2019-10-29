import { FORM_CONFIG } from 'lib/constants';
import { selectYears } from 'selectors/collections';
import DropdownFilterFactory from '../lib/filters-factory';

export default DropdownFilterFactory(selectYears, FORM_CONFIG.grantIssueYear.label);
