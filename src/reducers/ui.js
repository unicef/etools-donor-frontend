import { createSlice } from 'redux-starter-kit';
// import { onReceiveUserProfile } from './user-profile';

export const uiSlice = createSlice({
  initialState: {
    loading: false,
    page: null,
    donorId: null
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    onRouteChange(state, { payload }) {
      state.page = payload.page;
      state.donorId = payload.donorId;
    }
  }
});

export const { reducer: uiReducer } = uiSlice;
export const { setLoading, onRouteChange } = uiSlice.actions;
