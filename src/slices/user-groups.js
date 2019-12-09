import { createSlice } from 'redux-starter-kit';

const groupsSlice = createSlice({
  initialState: [],
  reducers: {
    setGroups: (state, action) => action.payload
  }
});

export const { reducer: groupsReducer } = groupsSlice;

export const { setGroups } = groupsSlice.actions;
