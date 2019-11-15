import { FORM_CONFIG } from 'lib/constants';
import { selectDonorCategory } from 'selectors/collections';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';

export default DropdownMultiFilterFactory(selectDonorCategory, FORM_CONFIG.reportCategory.label);
