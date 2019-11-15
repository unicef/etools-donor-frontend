import { createSlice } from 'redux-starter-kit';

const userProfileSlice = createSlice({
  initialState: null,
  reducers: {
    onReceiveUserProfile(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: userProfileReducer } = userProfileSlice;
export const { onReceiveUserProfile } = userProfileSlice.actions;
