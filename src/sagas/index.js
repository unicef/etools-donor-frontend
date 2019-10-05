import { all } from 'redux-saga/effects';
import userSaga from './user';
import collectionsSaga from './collections';

export default function*() {
  yield all([userSaga(), collectionsSaga()]);
}
