import { createSlice } from 'redux-starter-kit';

const externalGrantsSlice = createSlice({
  initialState: [],
  reducers: {
    onReceiveExternalGrants(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: externalGrants } = externalGrantsSlice;
export const { onReceiveExternalGrants } = externalGrantsSlice.actions;
