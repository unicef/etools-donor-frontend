import { createSlice } from 'redux-starter-kit';

export const uiSlice = createSlice({
  initialState: {
    loading: false,
    page: null,
    donorId: null
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
    }
  }
});

export const { reducer: uiReducer } = uiSlice;
export const { setLoading, onRouteChange, resetLoading } = uiSlice.actions;
