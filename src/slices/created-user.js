import { createReducer } from 'redux-starter-kit';
import { createUserSuccess, resetCreatedUser } from 'actions';

export const createdUserReducer = createReducer(null, {
  [createUserSuccess]: (state, action) => action.payload,
  [resetCreatedUser]: () => null
});
