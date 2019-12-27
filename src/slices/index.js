import { combineReducers } from 'redux';
import { userRolesReducer } from './user-roles';
import { errorReducer } from './error';
import { formErrorReducer } from './form-error';
import { collectionsReducers } from './collections';
import { donorsReducer } from './donors';
import { groupsReducer } from './user-groups';
import { createdUserReducer } from './created-user';
import { createdRoleReducer } from './created-role';
import { uiReducer } from './ui';
import { userProfileReducer } from './user-profile';
import { reportFilter } from './report-filter';
import { donorReducer } from './donor';
import { successReducer } from './success';

export default combineReducers({
  userRoles: userRolesReducer,
  userGroups: groupsReducer,
  donors: donorsReducer,
  donor: donorReducer,
  error: errorReducer,
  success: successReducer,
  formError: formErrorReducer,
  createdUser: createdUserReducer,
  createdRole: createdRoleReducer,
  userProfile: userProfileReducer,
  ui: uiReducer,
  reportFilter: reportFilter,
  ...collectionsReducers
});
