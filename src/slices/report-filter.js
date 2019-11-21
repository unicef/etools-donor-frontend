import { createSlice } from 'redux-starter-kit';
import DateFns from '@date-io/date-fns';

const dateUtils = new DateFns();

const reportFiltersSlice = createSlice({
  initialState: {
    reportYear: dateUtils.getYear(new Date())
  },
  reducers: {
    reportYearChanged(state, action) {
      state.reportYear = action.payload;
      state.theme = '';
    },
    themeChanged(state, action) {
      state.theme = action.payload;
      state.reportYear = '';
    }
  }
});

export const { reducer: reportFilter } = reportFiltersSlice;
export const { reportYearChanged, themeChanged } = reportFiltersSlice.actions;
