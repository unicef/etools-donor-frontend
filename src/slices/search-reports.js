import {
  createSlice
} from 'redux-starter-kit';

const searchReportsSlice = createSlice({
  initialState: {},
  reducers: {
    onReceiveSearchReports(state, action) {
      return action.payload;
    }
  }
});

export const {
  reducer: searchReports
} = searchReportsSlice;
export const {
  onReceiveSearchReports
} = searchReportsSlice.actions;
