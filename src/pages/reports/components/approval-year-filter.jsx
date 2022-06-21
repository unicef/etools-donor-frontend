import { FORM_CONFIG } from 'lib/constants';
import { selectApprovalYear } from 'selectors/collections';
import DropdownFilterFactory from '../lib/dropdown-filter-factory';

export default DropdownFilterFactory(selectApprovalYear, FORM_CONFIG.approvalYear.label, 'code');
