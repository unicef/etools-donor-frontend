import { FORM_CONFIG } from 'lib/constants';
import { selectDonorCategory } from 'selectors/collections';
import DropdownFilterFactory from '../lib/filters-factory';

export default DropdownFilterFactory(selectDonorCategory, FORM_CONFIG.reportCategory.label);
