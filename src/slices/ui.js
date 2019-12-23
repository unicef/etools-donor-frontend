import { createSlice } from 'redux-starter-kit';
import { REPORTS_PAGES } from 'lib/constants';

// const [page, donorId] = location.pathname.split('/').filter(Boolean);

export const uiSlice = createSlice({
  initialState: {
    loading: false,
    page: '',
    donorId: '',
    menuBarPage: ''
  },
  reducers: {
    setLoading(state, action) {
      // array keeps a loading que so race condition doesnt turn off loader during concurrent fetching
      if (Array.isArray(state.loading)) {
        if (action.payload === true) {
          state.loading.push(1);
        } else {
          state.loading.shift();
        }
        if (!state.loading.length) {
          state.loading = false;
        }
      } else {
        if (action.payload === true) {
          state.loading = [1];
        } else {
          state.loading = false;
        }
      }
    },
    resetLoading(state) {
      state.loading = false;
    },
    onRouteChange(state, { payload }) {
      state.page = payload.page;
      state.donorId = payload.donorId;
      if (REPORTS_PAGES.includes(payload.page)) {
        state.menuBarPage = payload.page;
      }
    },
    menuItemSelected(state, { payload }) {
      state.menuBarPage = payload;
    }
  }
});

export const { reducer: uiReducer } = uiSlice;
export const { setLoading, onRouteChange, menuItemSelected, resetLoading } = uiSlice.actions;
