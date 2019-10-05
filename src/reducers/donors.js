import { createSlice } from 'redux-starter-kit';

const initialState = [];

const donorsSlice = createSlice({
  initialState,
  reducers: {
    setDonors(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: donorsReducer } = donorsSlice;

export const { setDonors } = donorsSlice.actions;
