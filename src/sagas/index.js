import { all } from 'redux-saga/effects';
import userSaga from './user';
import collectionsSaga from './collections';
import transitionsSaga from './route-transitions';

export default function*() {
  yield all([userSaga(), collectionsSaga(), transitionsSaga()]);
}
