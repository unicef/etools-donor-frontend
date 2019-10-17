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

export default combineReducers({
  userRoles: userRolesReducer,
  userGroups: groupsReducer,
  donors: donorsReducer,
  error: errorReducer,
  formError: formErrorReducer,
  createdUser: createdUserReducer,
  createdRole: createdRoleReducer,
  userProfile: userProfileReducer,
  ui: uiReducer,
  ...collectionsReducers
});
