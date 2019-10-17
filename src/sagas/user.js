import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { getUserRoles, getUserGroups, createUser, createRole, getUserProfile } from 'api';
import { last } from 'ramda';
import { setUserRoles } from 'reducers/user-roles';
import { setError } from 'reducers/error';
import {
  onFetchUserRoles,
  onFetchUserGroups,
  onCreateUserRole,
  redirectToLogin,
  onFetchUserProfile
} from 'actions';
import { setGroups } from 'reducers/user-groups';
import { createRoleSuccess } from 'reducers/created-role';
import { onFormError } from 'reducers/form-error';
import { parseFormError } from 'lib/error-parsers';
import { setLoading } from 'reducers/ui';
import { onReceiveUserProfile } from 'reducers/user-profile';

function* handleFetchUserRoles(action) {
  yield put(setLoading(true));
  yield delay(500);
  try {
    const userRoles = yield call(getUserRoles, action.payload);
    yield put(setUserRoles(userRoles));
  } catch (err) {
    yield put(setError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleFetchUserGroups() {
  yield put(setLoading(true));
  try {
    const groups = yield call(getUserGroups);
    yield put(setGroups(groups));
  } catch (err) {
    yield put(setError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleCreateUserRole({ payload }) {
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

function* handleFetchUserProfile() {
  try {
    yield put(setLoading(true));
    const userProfile = yield call(getUserProfile);
    yield put(onReceiveUserProfile(userProfile));
  } catch (err) {
    yield put(redirectToLogin());
  } finally {
    yield put(setLoading(false));
  }
}

export default function*() {
  yield takeLatest(onFetchUserRoles.type, handleFetchUserRoles);
  yield takeLatest(onFetchUserGroups.type, handleFetchUserGroups);
  yield takeLatest(onCreateUserRole.type, handleCreateUserRole);
  yield takeLatest(createRoleSuccess.type, handleCreatedRole);
  yield takeLatest(onFetchUserProfile.type, handleFetchUserProfile);
}
