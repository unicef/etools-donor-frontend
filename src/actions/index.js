import { createAction } from 'redux-starter-kit';

export const initDonorsList = createAction('initDonorsList');
export const onFetchUserRoles = createAction('onFetchUserRoles');
export const onFetchUserGroups = createAction('onFetchUserGroups');
export const initDonorsFilter = createAction('initDonorsFilter');
export const onFilterUsers = createAction('onFilterUsers');
export const onCreateUser = createAction('onCreateUser');
export const createUserSuccess = createAction('createUserSuccess');
export const resetCreatedUser = createAction('resetCreatedUser');
export const onCreateUserRole = createAction('onCreateUserRole');
