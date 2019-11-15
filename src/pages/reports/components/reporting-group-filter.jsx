import { FORM_CONFIG } from 'lib/constants';
import { selectReportingGroup } from 'selectors/collections';
import DropdownFilterFactory from '../lib/dropdown-filter-factory';

export default DropdownFilterFactory(selectReportingGroup, FORM_CONFIG.reportingGroup.label);
