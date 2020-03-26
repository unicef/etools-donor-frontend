import {
  createSlice
} from 'redux-starter-kit';

const reportFiltersSlice = createSlice({
  initialState: {
    reportYear: ''
  },
  reducers: {
    reportYearChanged(state, action) {
      state.reportYear = action.payload;
    },
    themeChanged(state, action) {
      state.theme = action.payload;
    }
  }
});

export const {
  reducer: reportFilter
} = reportFiltersSlice;
export const {
  reportYearChanged,
  themeChanged
} = reportFiltersSlice.actions;
