import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { getUserRoles, getUserGroups, createUser, createRole } from 'api';
import { last } from 'ramda';
import { setUserRoles } from 'reducers/user-roles';
import { setError } from 'reducers/error';
import { onFetchUserRoles, onFetchUserGroups, onCreateUserRole } from 'actions';
import { setGroups } from 'reducers/user-groups';
import { createRoleSuccess } from 'reducers/created-role';
import { onFormError } from 'reducers/form-error';
import { parseFormError } from 'lib/error-parsers';

function* handleFetchUserRoles(action) {
  yield delay(500);
  try {
    const userRoles = yield call(getUserRoles, action.payload);
    yield put(setUserRoles(userRoles));
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* handleFetchUserGroups() {
  try {
    const groups = yield call(getUserGroups);
    yield put(setGroups(groups));
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* handleCreateUserRole({ payload }) {
  yield delay(1000);
  try {
    const user = yield call(createUser, payload.user);
    const role = yield call(createRole, { ...payload.rolePayload, user: user.id });
    yield put(createRoleSuccess(role));
  } catch (err) {
    const formErrors = parseFormError(err);
    yield put(onFormError(formErrors));
  }
}

function* handleCreatedRole() {
  const donor = last(location.pathname.split('/'));
  yield call(handleFetchUserRoles, {
    payload: { donor }
  });
}

export default function*() {
  yield takeLatest(onFetchUserRoles.type, handleFetchUserRoles);
  yield takeLatest(onFetchUserGroups.type, handleFetchUserGroups);
  yield takeLatest(onCreateUserRole.type, handleCreateUserRole);
  yield takeLatest(createRoleSuccess.type, handleCreatedRole);
}
