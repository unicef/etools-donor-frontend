import { createSlice } from 'redux-starter-kit';
import { onReceiveUserProfile } from './user-profile';

const initialState = [];

const donorsSlice = createSlice({
  initialState,
  reducers: {
    setDonors(state, action) {
      return action.payload;
    }
  },
  extraReducers: {
    [onReceiveUserProfile]: (state, action) => {
      return action.payload.donors;
    }
  }
});

export const { reducer: donorsReducer } = donorsSlice;

export const { setDonors } = donorsSlice.actions;
