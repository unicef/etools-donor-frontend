import { createSlice } from 'redux-starter-kit';

export const uiSlice = createSlice({
  initialState: {
    loading: false
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { reducer: uiReducer } = uiSlice;
export const { setLoading } = uiSlice.actions;
