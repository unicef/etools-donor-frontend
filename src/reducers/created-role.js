import { createSlice } from 'redux-starter-kit';

const createdRoleSlice = createSlice({
  initialState: null,
  reducers: {
    createRoleSuccess(state, action) {
      return action.payload;
    },
    resetCreatedRole(state, action) {
      return null;
    }
  }
});

export const { reducer: createdRoleReducer } = createdRoleSlice;
export const { createRoleSuccess, resetCreatedRole } = createdRoleSlice.actions;
