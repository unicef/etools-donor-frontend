import { FORM_CONFIG } from 'lib/constants';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';;
import {selectVaccineTypes} from 'selectors/collections';

export default DropdownMultiFilterFactory(selectVaccineTypes, FORM_CONFIG.vaccineType.label, 'code');
