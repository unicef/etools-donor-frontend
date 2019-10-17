import { createSlice } from 'redux-starter-kit';

const themesSlice = createSlice({
  initialState: [],
  reducers: {
    onReceivethemes(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: themes } = themesSlice;
export const { onReceivethemes } = themesSlice.actions;
