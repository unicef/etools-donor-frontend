import { createSlice } from 'redux-starter-kit';

export const officesSlice = createSlice({
  initialState: [],
  reducers: {
    onReceiveOffices(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: offices } = officesSlice;
export const { onReceiveOffices } = officesSlice.actions;
