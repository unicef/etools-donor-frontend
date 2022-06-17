import {createSlice} from 'redux-starter-kit';

const gaviSlice = createSlice({
  initialState: [],
  reducers: {
    onReceiveGavi(state, action) {
      return action.payload;
    }
  }
});

export const {reducer: gavi} = gaviSlice;
export const {onReceiveGavi} = gaviSlice.actions;
