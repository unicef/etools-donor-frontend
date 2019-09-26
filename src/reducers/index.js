import { combineReducers } from 'redux';
import { userRolesReducer } from './user';
import { errorReducer } from './error';

export default combineReducers({
    userRoles: userRolesReducer,
    error: errorReducer
});
