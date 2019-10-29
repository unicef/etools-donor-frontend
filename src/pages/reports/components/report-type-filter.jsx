import { FORM_CONFIG } from 'lib/constants';
import { selectReportType } from 'selectors/collections';
import DropdownFilterFactory from '../lib/filters-factory';

export default DropdownFilterFactory(selectReportType, FORM_CONFIG.reportType.label);
