import { FORM_CONFIG } from 'lib/constants';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';;
import {selectUserMOUGroups} from 'selectors/user';

export default DropdownMultiFilterFactory(selectUserMOUGroups, FORM_CONFIG.MOUGroup.label, 'name', 'id', 'name');
