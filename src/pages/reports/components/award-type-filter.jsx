import { FORM_CONFIG } from 'lib/constants';
import { selectAwardType } from 'selectors/collections';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';

export default DropdownMultiFilterFactory(selectAwardType, FORM_CONFIG.awardCategory.label, 'code');
