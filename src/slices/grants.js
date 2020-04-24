import {
  createSlice
} from 'redux-starter-kit';

const grantsSlice = createSlice({
  initialState: [],
  reducers: {
    onReceiveGrants(state, action) {
      return action.payload;
    }
  }
});

export const {
  reducer: grants
} = grantsSlice;
export const {
  onReceiveGrants
} = grantsSlice.actions;
