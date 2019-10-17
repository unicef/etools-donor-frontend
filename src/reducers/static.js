import { createSlice } from 'redux-starter-kit';

const staticSlice = createSlice({
  initialState: [],
  reducers: {
    onReceiveStaticAssets(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: staticAssets } = staticSlice;
export const { onReceiveStaticAssets } = staticSlice.actions;
