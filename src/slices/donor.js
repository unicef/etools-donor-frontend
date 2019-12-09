import { createSlice } from 'redux-starter-kit';

const donorSlice = createSlice({
  name: 'donor',
  initialState: '',
  reducers: {
    reportPageLoaded(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: donorReducer } = donorSlice;

export const { reportPageLoaded } = donorSlice.actions;
