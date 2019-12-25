import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  getUserRoles,
  getUserGroups,
  createUser,
  createRole,
  getUserProfile,
  patchRole,
  deleteRole
} from 'api';
import { setUserRoles } from 'slices/user-roles';
import { setError } from 'slices/error';
import {
  onFetchUserRoles,
  onFetchUserGroups,
  onCreateUserRole,
  onFetchUserProfile,
  redirectToLogin,
  userRoleEdited,
  deleteUserRole
} from 'actions';
import { setGroups } from 'slices/user-groups';
import { createRoleSuccess } from 'slices/created-role';
import { onFormError } from 'slices/form-error';
import { parseFormError } from 'lib/error-parsers';
import { setLoading } from 'slices/ui';
import { onReceiveUserProfile } from 'slices/user-profile';
import { selectDonorId } from 'selectors/ui-flags';

function* handleFetchUserRoles(action) {
  yield put(setLoading(true));
  try {
    const userRoles = yield call(getUserRoles, action.payload);
    yield put(setUserRoles(userRoles));
  } catch (err) {
    yield put(setError(err));
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
    yield put(setError(err));
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
  const donor = yield select(selectDonorId);
  yield call(handleFetchUserRoles, {
    payload: { donor }
  });
}

function* handleFetchUserProfile() {
  yield put(setLoading(true));
  try {
    const userProfile = yield call(getUserProfile);
    yield put(onReceiveUserProfile(userProfile));
  } catch (err) {
    yield put(redirectToLogin());
  } finally {
    yield put(setLoading(false));
  }
}

function* handleUserRolePatch({ payload }) {
  yield put(setLoading(true));
  try {
    const role = yield call(patchRole, payload);
    yield put(createRoleSuccess(role));
  } catch (err) {
    yield put(setError(err));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleDeleteUserRole({ payload }) {
  yield put(setLoading(true));
  try {
    const success = yield call(deleteRole, payload);
    if (success) {
      const donorId = yield select(selectDonorId);
      yield call(handleFetchUserRoles, {
        payload: {
          donor: donorId
        }
      });
    }
  } catch (err) {
    yield put(setError(err));
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
  yield takeLatest(userRoleEdited.type, handleUserRolePatch);
  yield takeLatest(deleteUserRole.type, handleDeleteUserRole);
}
