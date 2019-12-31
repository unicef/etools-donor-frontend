import { createSlice } from 'redux-starter-kit';

const successSlice = createSlice({
  initialState: null,
  reducers: {
    actionSucceeded(state, action) {
      return action.payload;
    },
    successCleared() {
      return null;
    }
  }
});

export const { reducer: successReducer } = successSlice;
export const { actionSucceeded, successCleared } = successSlice.actions;
