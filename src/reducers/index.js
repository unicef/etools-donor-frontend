import { combineReducers } from 'redux';
import { userRolesReducer } from './user-roles';
import { errorReducer } from './error';
import { collectionsReducers } from './collections';
import { donorsReducer } from './donors';
import { groupsReducer } from './user-groups';

export default combineReducers({
  userRoles: userRolesReducer,
  userGroups: groupsReducer,
  donors: donorsReducer,
  error: errorReducer,
  ...collectionsReducers
});
