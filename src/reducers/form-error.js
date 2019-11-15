import { createSlice } from 'redux-starter-kit';

const formErrorSlice = createSlice({
  initialState: null,
  reducers: {
    onFormError(state, action) {
      return action.payload;
    },
    onResetFormError() {
      return null;
    }
  }
});

export const { reducer: formErrorReducer } = formErrorSlice;
export const { onFormError, onResetFormError } = formErrorSlice.actions;
