import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { getUserRoles, getUserGroups } from 'api';
import { setUserRoles } from 'reducers/user-roles';
import { setError } from 'reducers/error';
import { onFetchUserRoles, onFetchUserGroups } from 'actions';
import { setGroups } from 'reducers/user-groups';

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

export default function*() {
  yield takeLatest(onFetchUserRoles.type, handleFetchUserRoles);
  yield takeLatest(onFetchUserGroups.type, handleFetchUserGroups);
}
