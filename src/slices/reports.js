import { createSlice } from 'redux-starter-kit';

const reportsSlice = createSlice({
  initialState: [],
  reducers: {
    onReceiveReports(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: reports } = reportsSlice;
export const { onReceiveReports } = reportsSlice.actions;
